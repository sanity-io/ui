import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './font'
import {ThemeInput} from './input'
import {ThemeLayer} from './layer'
import {ThemeShadow} from './shadow'
import {ThemeStyles} from './styles'

/** @public */
export interface RootTheme_v0 {
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
}
