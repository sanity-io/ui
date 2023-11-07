import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {ColorHueValue, ColorTintValue} from '../system'
import {
  FocusRing,
  ThemeAvatar,
  ThemeFontWeightKey,
  ThemeFonts,
  ThemeInput,
  ThemeLayer,
  ThemeShadow,
} from '../types'
import {ColorTokens} from './tokens'

export type ColorThemePalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<ColorHueValue, Record<ColorTintValue, string | ColorPaletteValue>>

export interface ThemeConfig {
  avatar?: ThemeAvatar
  button?: {
    border: {width: number}
    focusRing: FocusRing
    textWeight: ThemeFontWeightKey
  }
  card?: {
    border: {width: number}
    focusRing: FocusRing
    shadow: {outline: number}
  }
  color?: ColorTokens
  container?: number[]
  /** @deprecated Use component-specific `focusRing` values instead */
  focusRing?: {
    offset: number
    width: number
  }
  fonts?: ThemeFonts
  input?: ThemeInput
  // /**
  //  * THIS API MAY BE UNSTABLE. DO NOT USE IN PRODUCTION.
  //  * @beta
  //  */
  layer?: ThemeLayer
  media?: number[]
  palette?: ColorThemePalette
  radius?: number[]
  shadows?: Array<ThemeShadow | null>
  space?: number[]
  // styles?: Styles
}
