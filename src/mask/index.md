遮罩组件

```tsx
import React, {useState} from 'react'
import {Mask} from '@chentiyun/y-ui';

const Index = () =>{
    const [visible, setVisible] = useState(false)
    return <div>
      <button onClick={()=>setVisible(true)}>显示</button>
      <Mask
        visible={visible}
        onMaskClick={()=>setVisible(false)}
      >
        <div>这是内容</div>
      </Mask>
    </div>
}

export default Index

```

