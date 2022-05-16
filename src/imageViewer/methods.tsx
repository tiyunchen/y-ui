import React from 'react'
import {ImageViewer, ImageViewerProps} from './image-viewer'
import {renderImperatively} from '../utils/render-imperatively'


type ImageViewerShowHandler = {
  close: () => void
}
export function showImageViewer(props: Omit<ImageViewerProps, 'visible'>){
    const handler: ImageViewerShowHandler = renderImperatively(<ImageViewer
      {...props}
    />)

  return handler
}
