import {ThemeFocusRing} from './focusRing'

/**
 * @public
 */
export interface ThemeAvatar_v2 {
  sizes: {
    /** Spacing between avatars in an <AvatarStack> component (px) */
    distance: number
    /** Diameter of the avatar (px) */
    size: number
  }[]
  focusRing: ThemeFocusRing
}
