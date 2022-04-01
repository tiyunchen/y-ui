图片预览组件


```tsx
import React, {useState} from 'react';
import { ImageViewer } from '@chentiyun/y-ui';
export default () => {
    const [visible, setState] = useState(false)
  const demoImages = [
    'http://pic.weather.com.cn/images/cn/photo/2022/03/12/202203120907500A3D882CC8E9604E9BD7E3825DBB3365.jpg', 'http://pic.weather.com.cn/images/cn/photo/2022/03/14/20220314171305AC387DDA12116F31083B063B997CADA3.jpg',
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80',
    'https://images.unsplash.com/photo-1624993590528-4ee743c9896e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=1000&q=80',
  ]
  return (<div>
    <div>
      <ImageViewer 
        imgList={demoImages}
        visible={visible}
        onClick={()=>setState(false)}
      />
      <div onClick={()=>setState(true)}>显示</div>
    </div>
   
  </div>);
};
```
