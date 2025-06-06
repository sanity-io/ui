import type {ColorTint as ColorPaletteValue} from '@sanity/color'

import type {
  ThemeFocusRing,
  ThemeFonts,
  ThemeFontWeightKey,
  ThemeLayer,
  ThemeShadow,
  ThemeStyles,
} from '../../v0'
import type {Hue, Tint} from '../../v3'
import type {ThemeAvatar_v2} from '../avatar'
import type {ThemeInput_v2} from '../input'
import type {ThemeColorTokens} from './tokens'

/** @public */
export type ThemeColorPalette = {
  black: string | ColorPaletteValue
  white: string | ColorPaletteValue
} & Record<Hue, Record<Tint, string | ColorPaletteValue>>

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
