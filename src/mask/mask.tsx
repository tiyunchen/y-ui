import React, {useMemo, useState} from 'react';
import type {CSSProperties} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {renderToContainer, GetContainer} from '../utils/index'
import './style/index.less'

export interface MaskProps<S extends string = never> {
  /**
   * @description 是否显示
   */
  visible: boolean

  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void,

  color?: string,

  opacity: 'default' | 'thin' | 'thick' | number

  getContainer?: GetContainer,
  style?: CSSProperties & Partial<Record<S, string>>

}

const classPrefix = 'yui-mask'

const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
}

const Mask: React.FC<MaskProps> = (props) => {
  const [active, setActive] = useState(props.visible)
  const background = useMemo(()=>{
    // @ts-ignore
    const opacity = opacityRecord[props.opacity] ?? props.opacity
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0'
    return `rgba(${rgb}, ${opacity})`
  }, [props.color, props.opacity])

  const {opacity} = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true)
    },
    onRest: ()=>{
      setActive(props.visible)
      console.log('1111111', props.visible)
    }
  })
  return (
   renderToContainer( <animated.div
     className={classPrefix}
     style={{
       background: background,
       opacity,
       ...props.style,
       display: active ? 'unset' : 'none'
     }}
     onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
       setActive(false)
       props.onMaskClick &&  props.onMaskClick(event)
     }}
   >
     {
       props.onMaskClick && (
         <div
           className={`${classPrefix}-aria-button`}
           role="button"
           onClick={props.onMaskClick}
         />
       )
     }
      <div className={`${classPrefix}-content`}>
        {props.children}
      </div>
   </animated.div>, props.getContainer)
  )
};

Mask.defaultProps = {
  getContainer: null,
  color: 'black',
  opacity: 'default',
}

export default Mask;