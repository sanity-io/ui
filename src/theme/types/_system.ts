import {CSSObject} from '../../types'

import {ThemeAvatar} from './avatar'
import {ThemeColor, ThemeColorName, ThemeColorSchemeKey} from './color'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './fonts'
import {ThemeInput} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'

/**
 * @public
 */
export interface BaseTheme<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Styles extends {} = {},
> {
  avatar: ThemeAvatar
  button: {
    border: {width: number}
    focusRing: FocusRing
    textWeight: ThemeFontWeightKey
  }
  card: {
    border: {width: number}
    focusRing: FocusRing
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
  styles?: Styles
}

/**
 * @public
 */
export type RootTheme = BaseTheme<Styles>

/**
 * TODO: Rename to `ThemeStyles`
 * @public
 */
export interface Styles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}

/**
 * @public
 */
export interface ThemeContextValue {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}

/**
 * @public
 */
export interface FocusRing {
  offset: number
  width: number
}
