import React, {CSSProperties, useEffect, useRef, useState, MutableRefObject} from 'react';
import {useGesture} from '@use-gesture/react'
import {animated, useSpring} from '@react-spring/web'

export interface SlideProps {
  imgSrc: string,
  onZoomChange?: (zoom: number)=>void,
  slideRef?: MutableRefObject<boolean>,
  onClick: ()=>void
}

type IImgStyle = CSSProperties & {
  '--zoom': number
}

const CLASS_PREFIX = 'yui-image-viewer-slides'


export function rubberband(
  distance: number,
  dimension: number,
  constant: number
) {
  return (distance * dimension * constant) / (dimension + constant * distance)
}

function bound(
  position: number,
  min: number | undefined,
  max: number | undefined
) {
  let ret = position
  if (min !== undefined) {
    ret = Math.max(position, min)
  }
  if (max !== undefined) {
    ret = Math.min(ret, max)
  }
  return ret
}
export function rubberbandIfOutOfBounds(
  position: number,
  min: number,
  max: number,
  dimension: number,
  constant = 0.15
) {
  if (constant === 0) return bound(position, min, max)
  if (position < min)
    return -rubberband(min - position, dimension, constant) + min
  if (position > max)
    return +rubberband(position - max, dimension, constant) + max
  return position
}



const Slide: React.FC<SlideProps> = ({imgSrc, onZoomChange,slideRef, onClick}) => {
  const [baseZoom, setZoom] = useState(1)
  // 计算初始化zoom
  useEffect(()=>{
    let metaEl = document.querySelector('meta[name="viewport"]');
    let metaCtt = metaEl ? metaEl.getAttribute('content') : '';
    let matchScale = metaCtt?.match(/initial\-scale=([\d\.]+)/);
    let scale = matchScale ? (1 / parseFloat(matchScale[1])) : 1;
    setZoom(scale)
    if(slideRef){
      slideRef.current = true
    }

  }, [])

  const slideItemRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLImageElement>(null)
  const pinchRef = useRef(false)

  const [{zoom, x,y}, api] = useSpring(()=>(
    {
      zoom: 1,
      x: 0,
      y: 0,
      config: { tension: 200 },
    }
  ))

  function boundXY([x, y]: [number, number], rubberband: boolean) {
    const currentZoom = zoom.get()
    let xOffset = 0,
      yOffset = 0
    if (imgWrapRef.current && slideItemRef.current) {
      xOffset =
        ((currentZoom * imgWrapRef.current.width || 0) -
          slideItemRef.current.clientWidth) /
        2
      yOffset =
        ((currentZoom * imgWrapRef.current.height || 0) -
          slideItemRef.current.clientHeight) /
        2
    }

    xOffset = xOffset > 0 ? xOffset : 0
    yOffset = yOffset > 0 ? yOffset : 0

    const bounds = {
      left: -xOffset,
      right: xOffset,
      top: -yOffset,
      bottom: yOffset,
    }

    if(rubberband){
      return [
        rubberbandIfOutOfBounds(x, bounds.left, bounds.right, currentZoom * 50),
        rubberbandIfOutOfBounds(y, bounds.top, bounds.bottom, currentZoom * 50),
      ]
    } else {
      return [
        bound(x, bounds.left, bounds.right),
        bound(y, bounds.top, bounds.bottom),
      ]
    }

  }



  useGesture({
    onPinch: (state) => {
      // console.log('缩放', state) // 1 放大 -1是缩小
      let bzoom = state.offset[0]
      if(state.direction[0] === 1 && zoom.get() >= 6){
        bzoom = 6
      }
      if(state.direction[0] === -1 && zoom.get() <= 1){
        bzoom = 1
      }
      if(slideRef){
        slideRef.current = bzoom === 1
      }

      // 处在缩放的就不能拖拽
      pinchRef.current = !state.last

      // console.log('缩放', state.direction[0], state.offset[0], bzoom)
      // onZoomChange(bzoom)
      api.start({
        zoom: bzoom
      })
    },
    onDrag: (state) => {
      // 处在缩放的就不能拖拽 或 缩放比例为默认的时候不能拖拽
      if(state.tap && state.elapsedTime > 0 && state.elapsedTime < 1000 && zoom.get() === 1){
        onClick()
        return
      }
      if(!imgWrapRef.current || !slideItemRef.current) return;

      if(zoom.get() > 1 && !pinchRef.current){

        if (state.last) {
          const [x, y] = boundXY(
            [
              state.offset[0] + state.velocity[0] * state.direction[0] * 200,
              state.offset[1] + state.velocity[1] * state.direction[1] * 200,
            ],
            false
          )
          api.start({
            x,
            y,
          })
        } else {
          const [x, y] = boundXY(state.offset, true)
          api.start({
            x,
            y,
            immediate: true,
          })
        }

      }

    }
  },{
    target: slideItemRef,
    eventOptions: { passive: false, touch: true },
    pinch: {
      from: () => [zoom.get(), 0],
    }
  })


  let imgStyle: IImgStyle = {
    '--zoom': baseZoom
  }
  return (
    <div className={`${CLASS_PREFIX}-content-item`} ref={slideItemRef}>
      <div className={`${CLASS_PREFIX}-content-item-wrap`}>
        <animated.div
          style={{scale: zoom, x, y}}
          onDoubleClick={(e)=>{
            e.stopPropagation()
            if(slideRef){
              slideRef.current = true
            }
            api.start({
              zoom: 1,
              x: 0,
              y: 0
            })
          }}

        >
          <img
            src={imgSrc}
            alt=""
            style={imgStyle}
            draggable={false}
            ref={imgWrapRef}
          />
        </animated.div>
      </div>
    </div>
  )
};

export default Slide;
