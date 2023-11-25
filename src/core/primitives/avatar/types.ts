import {ThemeColorSpotKey} from '@sanity/ui/theme'
import {AvatarSize} from '../../types'

/**
 * @internal
 */
export interface AvatarRootStyleProps {
  $color: ThemeColorSpotKey
}

/**
 * @internal
 */
export interface ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}
