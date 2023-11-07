import type {StyledObject} from 'styled-components'
import {ThemeAvatar} from './avatar'
import {ThemeColor} from './color'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './fonts'
import {ThemeInput} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'

/**
 * Workaround types that are missing in v6
 * https://github.com/styled-components/styled-components/issues/4062
 * @internal
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = StyledObject<any>

/**
 * @public
 */
export interface ThemeStyles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

/**
 * @deprecated Use `ThemeStyles` instead
 * @public
 */
export type Styles = ThemeStyles

/**
 * @public
 */
export interface ThemeFocusRing {
  offset: number
  width: number
}

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
  styles?: Styles
}

/**
 * @public
 */
export type RootTheme = BaseTheme<ThemeStyles>

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}
