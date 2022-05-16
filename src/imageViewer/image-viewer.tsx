import React from 'react';
import cls from 'classnames'
import Mask from '../mask'
import {Slides} from './slides'
import './style/index.less'

export interface ImageViewerProps {
  visible?: boolean,
  imgList: string[],
  onClose: ()=>void,
  className?: string
}

const CLASS_PREFIX = 'yui-image-viewer'


export const ImageViewer: React.FC<ImageViewerProps> = (props) => {

  const className = cls(CLASS_PREFIX, props.className)
  return (<Mask
    visible={props.visible}
    opacity={0.9}
  >
    <div className={`${CLASS_PREFIX}`}>
      {props.visible && <Slides
        images={props.imgList}
        defaultIndex={0}
        onClick={()=>props.onClose()}
      />}
    </div>
  </Mask>)
};

