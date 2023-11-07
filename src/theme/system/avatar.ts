import {ThemeFocusRing} from './_system'

/**
 * @public
 */
export interface ThemeAvatar {
  sizes: {
    /** Spacing between avatars in an <AvatarStack> component (px) */
    distance: number
    /** Diameter of the avatar (px) */
    size: number
  }[]
  focusRing: ThemeFocusRing
}
