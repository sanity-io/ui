import {ColorTint as ColorPaletteValue} from '@sanity/color'
import {ColorHueValue, ColorTintValue} from '../system'
import {ColorTokens} from './tokens/color/types'

export type ColorThemePalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<ColorHueValue, Record<ColorTintValue, string | ColorPaletteValue>>

export interface ThemeConfig {
  color?: ColorTokens
  palette?: ColorThemePalette
}
