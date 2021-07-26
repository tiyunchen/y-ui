export interface ButtonProps {
    /**
     * 按钮类型
     * @default primary
     */
    type?: 'primary' | 'success' | 'error',

    /**
     * 点击回调函数
     * @default ()=>{}
     */
    onClick?: Function,

    /**
     * 按钮的class
     */
    className?: string,

  /**
   * 是否在加载中
   * @default false
   */
  loading?: boolean
}
