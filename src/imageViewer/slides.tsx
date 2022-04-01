import React, {useRef, useState} from 'react';
import {useDrag, usePinch} from '@use-gesture/react'
import {animated, useSpring} from '@react-spring/web'

export interface SlidesProps {
  images: string[],
  onChange?: (index: number) =>void,
  defaultIndex: number
}

const triggerDistance = 200

const CLASS_PREFIX = 'yui-image-viewer-slides'

const Slides: React.FC<SlidesProps> = (props) => {
  const clientWidth = window.innerWidth
  const [{x, y}, api] = useSpring(()=>({x: props.defaultIndex * clientWidth, y: 0}))
  const slideRef = useRef<HTMLDivElement>(null)
  const slideItemRef = useRef<HTMLDivElement>(null)
  const slideIndex = useRef(0)

  const bind = useDrag((state)=>{
    const [x, y] = state.movement
    if(state.last){
      const left = x < -triggerDistance && slideIndex.current < props.images.length - 1
      // 向右 -1
      const right = x > triggerDistance && slideIndex.current > 0
      if(right){
        slideIndex.current -= 1
      }else if(left){ // 向左 +1
        slideIndex.current += 1
      }
      api.start({x: -(clientWidth * slideIndex.current)})
    } else {
      // 到达左右边界的阻尼效果
      if(Math.abs(x) < triggerDistance){
        api.start({x: -(clientWidth * slideIndex.current)+x})
        console.log('stat11e', state, x)
      }
    }
  }, {
    axis: 'x',
  })

  const pinch = usePinch((state)=>{
    console.log('缩放', state)
  })



  return (
    <animated.div className={CLASS_PREFIX} style={{x, y}} {...bind()} ref={slideRef}>
      <div className={`${CLASS_PREFIX}-content`}>
        {
          props.images.map((img, key)=>(
            <div className={`${CLASS_PREFIX}-content-item`} key={key} ref={slideItemRef}>
              <div className={`${CLASS_PREFIX}-content-item-wrap`}>
                <img src={img} alt=""/>
              </div>
            </div>
          ))
        }
      </div>
    </animated.div>
  )
};
Slides.defaultProps = {
  images: []
}

export { Slides }
