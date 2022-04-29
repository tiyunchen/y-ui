import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import {useGesture} from '@use-gesture/react'

export interface SlideProps {
  imgSrc: string
}

type IImgStyle = CSSProperties & {
  '--zoom': number
}

const CLASS_PREFIX = 'yui-image-viewer-slides'

const Slide: React.FC<SlideProps> = ({imgSrc}) => {
  const [baseZoom, setZoom] = useState(1)
  // 计算初始化zoom
  useEffect(()=>{
    let metaEl = document.querySelector('meta[name="viewport"]');
    let metaCtt = metaEl ? metaEl.getAttribute('content') : '';
    let matchScale = metaCtt?.match(/initial\-scale=([\d\.]+)/);
    let scale = matchScale ? (1 / parseFloat(matchScale[1])) : 1;
    setZoom(scale)
  }, [])
  const slideItemRef = useRef<HTMLImageElement>(null)


  useGesture({
    onPinch: (state) => {
      console.log('缩放', state)
    },
    // onDrag: (state) => {
    //   console.log('state',state)
    // }
  },{
    target: slideItemRef,
    eventOptions: { passive: false, touch: true },
  })


  let imgStyle: IImgStyle = {
    '--zoom': baseZoom
  }

  return (
    <div className={`${CLASS_PREFIX}-content-item`} ref={slideItemRef}>
      <div className={`${CLASS_PREFIX}-content-item-wrap`}>
        <div>
          <img
            src={imgSrc}
            alt=""
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  )
};

export default Slide;
