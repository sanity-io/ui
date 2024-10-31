import {ColorHueKey, ColorTint as ColorPaletteValue, ColorTintKey} from '@sanity/color'

import {
  ThemeFocusRing,
  ThemeFonts,
  ThemeFontWeightKey,
  ThemeLayer,
  ThemeShadow,
  ThemeStyles,
} from '../v0'
import {ThemeAvatar_v2, ThemeInput_v2} from '../v2'
import {ThemeColorTokens} from './tokens'

/** @public */
export type ThemeColorPalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<ColorHueKey, Record<ColorTintKey, string | ColorPaletteValue>>

/** @public */
export interface ThemeConfig {
  avatar?: ThemeAvatar_v2
  button?: {
    border: {width: number}
    focusRing: ThemeFocusRing
    textWeight: ThemeFontWeightKey
  }
  card?: {
    border: {width: number}
    focusRing: ThemeFocusRing
    shadow: {outline: number}
  }
  color?: ThemeColorTokens
  container?: number[]
  font?: ThemeFonts
  input?: ThemeInput_v2
  layer?: ThemeLayer
  media?: number[]
  palette?: ThemeColorPalette
  radius?: number[]
  shadow?: Array<ThemeShadow | null>
  space?: number[]
  /** @internal */
  style?: ThemeStyles
}
