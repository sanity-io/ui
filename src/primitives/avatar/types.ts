import {AvatarSize} from '../../types'

/**
 * @internal
 */
export interface AvatarRootStyleProps {
  $color: string
}

/**
 * @internal
 */
export interface ResponsiveAvatarSizeStyleProps {
  $size: AvatarSize[]
}

/**
 * @public
 */
export type ThemeColorSpotKey =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
