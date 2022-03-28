import React, {CSSProperties} from 'react';
import cls from 'classnames'
import type {NativeProps} from '../utils/native-props'

const CLASS_PREFIX = 'yui-badge'


export const dot = Symbol()

export interface BadgeProps extends NativeProps<'--right' | '--top' | '--color'>{
  content?: React.ReactNode | typeof dot,
  color?: string,
  border?: boolean
}
export const Badge: React.FC<BadgeProps> = (props) => {

  const isDot = props.content === dot
  const badgeCls = cls(CLASS_PREFIX,
    isDot && `${CLASS_PREFIX}-dot`,
    !!props.children && `${CLASS_PREFIX}-fixed`,
    props.className
    )
  const element = props.content ? <div
    className={badgeCls}
    style={{
      ...props.style,
      '--color': props.color
    } as CSSProperties}


  >{!isDot && <div className={`${CLASS_PREFIX}-content`}>{props.content}</div>}</div> : null
  return (
    <div className={`${CLASS_PREFIX}-wrap`}>
      {element}
      {props.children}
    </div>
  )
};
