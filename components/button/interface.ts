export interface ButtonProps {
    /**
     * 按钮类型
     */
    type?: 'primary' | 'success' | 'error',

    /**
     * 点击回调函数
     */
    onClick?: Function,

    /**
     * 按钮的class
     */
    className?: string
}
