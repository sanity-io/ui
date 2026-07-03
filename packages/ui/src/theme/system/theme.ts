import {ThemeAvatar_v2} from './avatar'
import {ThemeColorCard_v2, ThemeColorSchemes_v2} from './color'
import {ThemeFocusRing} from './focusRing'
import {ThemeFonts, ThemeFontWeightKey} from './font'
import {ThemeInput_v2} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'
import {ThemeStyles} from './styles'
import {ThemeAvatar, ThemeColor, ThemeColorSchemes, ThemeInput} from './v0'

/**
 * @public
 */
export interface RootTheme_v2 {
  _version: 2
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
  color: ThemeColorSchemes_v2
  container: number[]
  font: ThemeFonts
  input: ThemeInput_v2
  layer: ThemeLayer
  media: number[]
  radius: number[]
  shadow: Array<ThemeShadow | null>
  space: number[]
  /** @internal */
  style?: ThemeStyles
}

/**
 * @public
 */
export interface BaseTheme {
  _version?: 0
  /**
   * @deprecated Use `v2.avatar` instead
   */
  avatar: ThemeAvatar
  /**
   * @deprecated Use `v2.button` instead
   */
  button: {
    textWeight: ThemeFontWeightKey
  }
  /**
   * @deprecated Use `v2.color` instead
   */
  color: ThemeColorSchemes
  /**
   * @deprecated Use `v2.container` instead
   */
  container: number[]
  /**
   * @deprecated Use component-specific `v2.{button | card | input}.focusRing` values instead
   */
  focusRing: {
    offset: number
    width: number
  }
  /**
   * @deprecated Use `v2.font` instead
   */
  fonts: ThemeFonts
  /**
   * @deprecated Use `v2.input` instead
   */
  input: ThemeInput
  /**
   * THIS API MAY BE UNSTABLE. DO NOT USE IN PRODUCTION.
   * @beta
   * @deprecated Use `v2.layer` instead
   */
  layer?: ThemeLayer
  /**
   * @deprecated Use `v2.media` instead
   */
  media: number[]
  /**
   * @deprecated Use `v2.radius` instead
   */
  radius: number[]
  /**
   * @deprecated Use `v2.shadow` instead
   */
  shadows: Array<ThemeShadow | null>
  /**
   * @deprecated Use `v2.space` instead
   */
  space: number[]
  /**
   * @internal
   * @deprecated Use `v2.style` instead
   */
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
export type Theme_v2 = Omit<RootTheme_v2, 'color'> & {
  color: ThemeColorCard_v2
  /**
   * Indicates whether the theme is resolved or raw, it's necessary to avoid issues
   * with sanity V2 components accessing a v1 <ThemeProvider>.
   * See https://github.com/sanity-io/ui/pull/1203 for more info.
   */
  _resolved: boolean
}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color' | 'v2'> & {
    /**
     * @deprecated Use `v2.color` instead
     */
    color: ThemeColor
    v2?: Theme_v2
  }
}
