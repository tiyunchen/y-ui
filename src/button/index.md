Button 按钮

```tsx
import React from 'react';
import { Button } from '@chentiyun/y-ui';
export default () => {
  return (<div>
    <div>
      <div>正常状态</div>
      <Button onClick={()=>console.log(222)}>确定</Button>
    </div>
    <div>
      <div>禁止状态</div>
      <Button onClick={()=>console.log(222)} loading={true} disabled={true}>确定</Button>
    </div>
    <div>
      <div>告警状态</div>
      <Button onClick={()=>console.log(222)} type={'error'}>确定</Button>
    </div>
    <div>
      <div>成功状态</div>
      <Button onClick={()=>console.log('成功')} type={'success'}>确定</Button>
    </div>
  </div>);
};
```

<API></API>

