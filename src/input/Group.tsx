import React from 'react';
export interface GroupProps {
  /**
   * 可以这样写属性描述
   * @description       也可以显式加上描述名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  className?: string; // 支持识别 TypeScript 可选类型为非必选属性
}
const Group: React.FC<GroupProps> = () => <div>Hello Worldss!</div>;

export default Group;
