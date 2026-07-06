import {ThemeColorAvatarColorKey, ThemeColorBlendModeKey} from './_system'

/**
 * @public
 */
export interface ThemeColorAvatarHue_v2 {
  _blend?: ThemeColorBlendModeKey
  bg: string
  fg: string
}

/**
 * @public
 */
export type ThemeColorAvatar_v2 = Record<ThemeColorAvatarColorKey, ThemeColorAvatarHue_v2>
