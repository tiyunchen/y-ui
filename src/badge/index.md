```tsx
import React from 'react';
import { Badge } from '@chentiyun/y-ui';
export default () => {
  return (<div style={{
      paddingTop: 10
  }}>
    <div>
      <Badge content={Badge.dot}>新消息</Badge>
    </div>
    <div>
      <Badge 
        content={Badge.dot}
        color="#1890ff"
      >新消息</Badge>
    </div>
    <div>
      <Badge content="11">新消息</Badge>
    </div>
  </div>);
};
```


## 属性
```
export interface BadgeProps extends NativeProps<'--right' | '--top' | '--color'>{
  content?: React.ReactNode | typeof dot,
  color?: string,
  border?: boolean
}

```

