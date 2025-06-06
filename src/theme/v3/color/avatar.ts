import type {AVATAR_COLORS} from './_constants'
import type {ColorValue} from './token'

/** @public */
export type AvatarColor = (typeof AVATAR_COLORS)[number]

/** @public */
export interface ThemeColorAvatarHue_v3 {
  bg: ColorValue
  fg: ColorValue
}

/** @public */
export type ThemeColorAvatar_v3 = Record<AvatarColor, ThemeColorAvatarHue_v3>
