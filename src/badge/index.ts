import {Badge as OriginBadge, dot} from './badge'
import {attachPropertiesToComponent} from '../utils/attach-properties-to-component'
export type {BadgeProps} from './badge'
import './style/badge.less'


type BadgeProps = typeof OriginBadge & {
  dot?: typeof dot
}
const Badge:BadgeProps = OriginBadge
Badge.dot = dot
export default Badge
// export default attachPropertiesToComponent(OriginBadge, {
//   dot: dot
// })

