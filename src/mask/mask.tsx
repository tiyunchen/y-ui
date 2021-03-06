import React, {useMemo, useState, useRef} from 'react';
import cls from 'classnames'
import type {CSSProperties} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {renderToContainer, GetContainer} from '../utils/index'
import {useLockScroll} from '../utils/use-lock-scroll'
import './style/index.less'

export interface MaskProps<S extends string = never> {
  /**
   * @description 是否显示
   */
  visible?: boolean

  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void,

  color?: string,

  opacity?: 'default' | 'thin' | 'thick' | number

  getContainer?: GetContainer,
  style?: CSSProperties & Partial<Record<S, string>>,

  className?: string

}

const classPrefix = 'yui-mask'

const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
}

const Mask: React.FC<MaskProps> = (props) => {
  const [active, setActive] = useState(props.visible)


  const ref = useRef<HTMLDivElement>(null)

  // 锁定屏幕禁止滚动
  useLockScroll(ref, props.visible)

  const background = useMemo(()=>{
    let opacity = props.opacity || 'default'
    opacity = typeof opacity === 'number' ? opacity : opacityRecord[opacity]
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0'
    return `rgba(${rgb}, ${opacity})`
  }, [props.color, props.opacity])

  // 动画样式处理
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
    }
  })
  return (
   renderToContainer( <animated.div
     className={cls(classPrefix, props.className)}
     style={{
       background: background,
       opacity,
       ...props.style,
       display: active ? 'unset' : 'none'
     }}
     onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
       props.onMaskClick &&  props.onMaskClick(event)
     }}
     ref={ref}
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
  getContainer: ()=>document.body,
  color: 'black',
  opacity: 'default',
}

export default Mask;
