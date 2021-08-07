import React from 'react';
import Button from '../button';
import '../style/index.less';

export default () => <Button type="primary" onClick={()=>alert(111)}>这是按钮</Button>;
