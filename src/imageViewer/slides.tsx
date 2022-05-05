import React, {useRef, useState} from 'react';
import {useDrag, usePinch} from '@use-gesture/react'
import {animated, useSpring} from '@react-spring/web'
import Slide from './slide'

export interface SlidesProps {
  images: string[],
  onChange?: (index: number) =>void,
  onClick: ()=>void;
  defaultIndex: number
}

const triggerDistance = 200

const CLASS_PREFIX = 'yui-image-viewer-slides'

const Slides: React.FC<SlidesProps> = (props) => {
  const clientWidth = window.innerWidth
  const [{x, y}, api] = useSpring(()=>({x: props.defaultIndex * clientWidth, y: 0}))

  const slideRef = useRef<HTMLDivElement>(null)
  const slideIndex = useRef(0)

  const bind = useDrag((state)=>{

    if(state.tap && state.elapsedTime > 0 && state.elapsedTime < 1000){
      console.log('state', state)
      props.onClick()
      return
    }
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
      }
    }
  }, {
    axis: 'x',
    eventOptions: { passive: false, touch: true },
  })




  return (
    <animated.div className={CLASS_PREFIX}
                  style={{x, y}} {...bind()}
                  ref={slideRef}
    >
      <div className={`${CLASS_PREFIX}-content`}>
        {
          props.images.map((img, key)=>(<Slide imgSrc={img} key={key} />))
        }
      </div>
    </animated.div>
  )
};
Slides.defaultProps = {
  images: []
}

export { Slides }
