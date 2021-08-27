Button 按钮

```tsx
import React from 'react';
import { Button } from '@chentiyun/y-ui';
export default () => {
  return (<div>
    <div>
      <Button onClick={()=>console.log(222)}>确定</Button>
    </div>
    <div>
      <Button onClick={()=>console.log(222)} loading={true} disabled={true}>确定</Button>
    </div>
    <div>
      <Button onClick={()=>console.log(222)} type={'error'}>确定</Button>
    </div>
  </div>);
};
```

<API></API>

