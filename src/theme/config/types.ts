import {ColorHueKey, ColorTint as ColorPaletteValue, ColorTintKey} from '@sanity/color'
import { ThemeAvatar_v2 } from '../system/avatar'
import { ThemeFocusRing } from '../system/focusRing'
import { ThemeFontWeightKey, ThemeFonts } from '../system/font'
import { ThemeInput_v2 } from '../system/input'
import { ThemeLayer } from '../system/layer'
import { ThemeShadow } from '../system/shadow'
import { ThemeStyles } from '../system/styles'
import { ThemeColorTokens } from './tokens/color/types'

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
