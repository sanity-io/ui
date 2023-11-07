import {ColorHueKey, ColorTint as ColorPaletteValue, ColorTintKey} from '@sanity/color'
import {
  ThemeAvatar,
  ThemeFocusRing,
  ThemeFontWeightKey,
  ThemeFonts,
  ThemeInput,
  ThemeLayer,
  ThemeShadow,
  ThemeStyles,
} from '../system'
import {ThemeColorTokens} from './tokens'

export type ThemeColorPalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<ColorHueKey, Record<ColorTintKey, string | ColorPaletteValue>>

export interface ThemeConfig {
  avatar?: ThemeAvatar
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
  /** @deprecated Use component-specific `focusRing` values instead */
  focusRing?: {
    offset: number
    width: number
  }
  fonts?: ThemeFonts
  input?: ThemeInput
  /**
   * THIS API MAY BE UNSTABLE. DO NOT USE IN PRODUCTION.
   * @beta
   */
  layer?: ThemeLayer
  media?: number[]
  palette?: ThemeColorPalette
  radius?: number[]
  shadows?: Array<ThemeShadow | null>
  space?: number[]
  styles?: ThemeStyles
}
