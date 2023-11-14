import {FocusRing} from '../../types'

/**
 * @public
 */
export interface ThemeAvatar {
  sizes: {
    /** Distance between avatars in an <AvatarStack> component (px) */
    distance: number
    /** Diameter (px) */
    size: number
  }[]
  focusRing: FocusRing
}
