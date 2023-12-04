import {ThemeColorBlendModeKey} from './_system'

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
export interface ThemeColorAvatar_v2 {
  gray: ThemeColorAvatarHue_v2
  blue: ThemeColorAvatarHue_v2
  purple: ThemeColorAvatarHue_v2
  magenta: ThemeColorAvatarHue_v2
  red: ThemeColorAvatarHue_v2
  orange: ThemeColorAvatarHue_v2
  yellow: ThemeColorAvatarHue_v2
  green: ThemeColorAvatarHue_v2
  cyan: ThemeColorAvatarHue_v2
}
