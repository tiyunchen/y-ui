import React from 'react';
export interface ImageViewerProps {
  visible: boolean,
  imgList: string[],

}
const ImageViewer: React.FC<ImageViewerProps> = () => <div>Hello World!</div>;

export default ImageViewer;
