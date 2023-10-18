import {ColorTints, hues} from '@sanity/color'
import {ThemeColorName} from '../lib/theme'

export const tones: Record<ThemeColorName, ColorTints> = {
  default: hues.gray,
  transparent: hues.gray,
  primary: hues.gray,
  positive: hues.cyan,
  caution: hues.yellow,
  critical: hues.red,
} as const
