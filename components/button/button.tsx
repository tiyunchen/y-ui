import React, {MouseEvent} from "react";

import combineClass from 'classnames'

import { ButtonProps } from './interface'

const Button: React.FC<ButtonProps> = ({
                                           type='primary',
                                           onClick= () => {},
                                           className= '',
                                           children
}) => {
    const btnClass = combineClass('yui-btn', `y-ui-btn-${type}`, className)
    return <div className={btnClass}
                onClick={(event: MouseEvent)=>onClick(event)}
    >{children || '按钮'}</div>
}


export default Button
