import {ThemeColorAvatarColorKey} from '@sanity/ui/theme'
import { AvatarSize } from '../../types/avatar'

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
