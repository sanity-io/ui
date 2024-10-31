import {ThemeConfig} from '../config'
import {PaletteConfig} from '../palette'
import {ThemeFocusRing, ThemeFonts, ThemeFontWeightKey, ThemeLayer, ThemeShadow} from '../v0'
import {ThemeAvatar_v2, ThemeInput_v2} from '../v2'
import {ThemeColor_v3} from './color'
import {PartialTokens, Tokens} from './tokens'

/** @public */
export type ThemeEntry = [`--${string}`, string]

/** @public */
export interface ThemeOptions {
  v2?: ThemeConfig
  palette?: PaletteConfig
  tokens?: PartialTokens<Tokens>
}

/**
 * Supersedes `RootTheme` and `RootTheme_v2`.
 *
 * @public
 */
export interface Theme_v3 {
  _version: 3
  _palette: PaletteConfig
  _tokens: Tokens
  avatar: ThemeAvatar_v2
  button: {
    border: {width: number}
    focusRing: ThemeFocusRing
    textWeight: ThemeFontWeightKey
  }
  card: {
    border: {width: number}
    focusRing: ThemeFocusRing
    shadow: {outline: number}
  }
  color: ThemeColor_v3
  // color: ThemeColorSchemes_v2
  container: number[]
  font: ThemeFonts
  input: ThemeInput_v2
  layer: ThemeLayer
  media: number[]
  radius: number[]
  shadow: Array<ThemeShadow | null>
  space: number[]
}
