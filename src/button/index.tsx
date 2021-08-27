import React, { MouseEvent } from 'react';
import {LoadingOutlined} from '@ant-design/icons'
import combineClass from 'classnames';
import { ButtonProps } from './interface';
import './style/index.less'

const Button: React.FC<ButtonProps> = (props) => {
  const {type, onClick, className, children, loading, disabled } = props
  const btnClass = combineClass('yui-btn', {
    [`yui-btn-${type}`]: type,
  }, className);

  /**
   * 点击回调
   * @param e
   */
  const handleClick = (e: React.MouseEvent) => {
    if(loading || disabled){
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  }

  return (
    <button
      className={btnClass}
      onClick={handleClick}
      data-loading={loading ? 'yes' : 'no'}
      disabled={disabled}
    >
      {loading && <LoadingOutlined className={'mr-8'} />}
      {children || '按钮'}
    </button>
  );
};
Button.defaultProps = {
  onClick: (event:MouseEvent) =>{},
  loading: false,
  type: 'primary'
}

export default Button;
