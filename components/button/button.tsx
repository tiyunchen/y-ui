import React from "react";
import combineClass from 'classnames'
import { ButtonProps } from './interface'
import PropTypes from 'prop-types'

const Button: React.FC<ButtonProps> = ({type='primary', onClick, className}) => {
    const btnClass = combineClass('yui-btn', `y-ui-btn-${type}`, className)
    return <div className={btnClass}>按钮</div>
}


Button.propTypes = {
    /**
     * 按钮类型
     */
    type: PropTypes.oneOf(['primary', 'success', 'error']),
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Button
