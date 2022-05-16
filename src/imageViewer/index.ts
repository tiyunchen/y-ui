import {ImageViewer} from './image-viewer'
import {showImageViewer} from './methods'
import {attachPropertiesToComponent} from '../utils/attach-properties-to-component'
export type {ImageViewerProps} from './image-viewer'

export default attachPropertiesToComponent(ImageViewer, {
  show: showImageViewer
})
