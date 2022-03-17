输入框

```tsx
import React from 'react';
import { Input } from '@chentiyun/y-ui';
const Group = Input.Group
export default () => {
  return (<div>
    <div>
      <div>正常状态</div>
      <Group />
      <Input onChange={e=>{
          e.persist()
          console.log('222', e.target.value, React.version)
      }} />
    </div>
   
  </div>);
};
```

<API hideTitle></API>

