import {ThemeColorAvatarColorKey} from '../../../theme/system/color/_system'
import {AvatarSize} from '../../types/avatar'

/**
 * @internal
 */
export interface AvatarRootStyleProps {
  $color: ThemeColorAvatarColorKey
}

/**
 * @internal
 */
export interface ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}
