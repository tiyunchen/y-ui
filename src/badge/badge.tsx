import React from 'react';
import type {NativeProps} from '../utils/native-props'

const CLASS_PREFIX = 'yui-badge'


export const dot = Symbol()

export interface BadgeProps extends NativeProps<'--right' | '--top' | '--color'>{
  content?: React.ReactNode | typeof dot,
  color?: string,
  border?: boolean
}
export const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <div className={CLASS_PREFIX}>
      {props.children}
    </div>
  )
};
