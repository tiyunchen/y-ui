import React, {ChangeEvent} from 'react';
import joinClass from 'classnames'

import './style/index.less'

const prefixCls = 'yui-input'


export interface InputProps {
  /**
   * type
   * @description       也可以显式加上描述名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  type?: 'text' | 'tel' | 'date';

  /**
   * @description 尺寸
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * @description 回调
   */
  onChange?: (e: ChangeEvent)=>void;

  /**
   * @description 样式class
   */
  wrapClassName?: string

  /**
   * @description 是否有边框
   */
  border?: boolean;


}
const Input: React.FC<InputProps> = (props) => {
  const {type, wrapClassName, border, size, onChange} = props
  const inputClass  = joinClass(prefixCls, {
    [`${wrapClassName}`]: wrapClassName,
    [`${prefixCls}-borderless`]: !border,
    [`${prefixCls}-size-small`]: size === 'small',
    [`${prefixCls}-size-lg`]: size === 'large',
  })
  return <input type={type}
                className={inputClass}
                onChange={(e)=> {
                  e.persist()
                  onChange ? onChange(e) : ''
                }}
  />
};
// Input.defaultProps = {
//   size: 'middle',
//   border: true,
//   onChange: () => {}
// }
export default Input;


