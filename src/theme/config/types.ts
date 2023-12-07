import {ColorHueKey, ColorTint as ColorPaletteValue, ColorTintKey} from '@sanity/color'
import {
  ThemeAvatar_v2,
  ThemeFocusRing,
  ThemeFontWeightKey,
  ThemeFonts,
  ThemeInput_v2,
  ThemeLayer,
  ThemeShadow,
  ThemeStyles,
} from '../system'
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
