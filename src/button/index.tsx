import React, { MouseEvent } from 'react';
import {LoadingOutlined} from '@ant-design/icons'
import combineClass from 'classnames';
import { ButtonProps } from './interface';
import './style/index'

const Button: React.FC<ButtonProps> = (props) => {
  const {type, onClick, className, children, loading} = props
  const btnClass = combineClass('yui-btn', `y-ui-btn-${type}`, className);
  return (
    <div
      className={btnClass}
      onClick={(event:MouseEvent) => onClick && onClick(event)}
      data-loading={loading ? 'yes' : 'no'}
    >
      {loading && <LoadingOutlined className={'mr-8'} />}
      {children || '按钮'}
    </div>
  );
};
Button.defaultProps = {
  onClick: (event:MouseEvent) =>{},
  loading: false,
  type: 'primary'
}

export default Button;
