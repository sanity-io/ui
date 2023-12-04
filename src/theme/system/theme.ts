import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes_v2, ThemeColorCard_v2} from './color'
import {ThemeFocusRing} from './focusRing'
import {ThemeFontWeightKey, ThemeFonts} from './fonts'
import {ThemeInput} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'
import {ThemeStyles} from './styles'
import {ThemeColor, ThemeColorSchemes} from './v0'

/**
 * @public
 */
export interface RootTheme_v2 {
  _version: 2
  avatar: ThemeAvatar
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
  color: ThemeColorSchemes_v2
  container: number[]
  font: ThemeFonts
  input: ThemeInput
  layer: ThemeLayer
  media: number[]
  radius: number[]
  shadow: Array<ThemeShadow | null>
  space: number[]
  style?: ThemeStyles
}

/**
 * @public
 */
export interface BaseTheme {
  _version?: 0
  avatar: ThemeAvatar
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
  color: ThemeColorSchemes
  container: number[]
  /** @deprecated Use component-specific `focusRing` values instead */
  focusRing: {
    offset: number
    width: number
  }
  fonts: ThemeFonts
  input: ThemeInput
  /**
   * THIS API MAY BE UNSTABLE. DO NOT USE IN PRODUCTION.
   * @beta
   */
  layer?: ThemeLayer
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  /** @internal */
  styles?: ThemeStyles

  v2?: RootTheme_v2
}

/**
 * @public
 */
export type RootTheme = BaseTheme

/**
 * @public
 */
export type Theme_v2 = Omit<RootTheme_v2, 'color'> & {color: ThemeColorCard_v2}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color' | 'v2'> & {
    color: ThemeColor
    v2?: Theme_v2
  }
}
