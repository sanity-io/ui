import type {ThemeFocusRing} from '../v0/focusRing'
import type {ThemeFonts, ThemeFontWeightKey} from '../v0/font'
import type {ThemeLayer} from '../v0/layer'
import type {ThemeShadow} from '../v0/shadow'
import type {ThemeStyles} from '../v0/styles'
import type {ThemeAvatar_v2} from './avatar'
import type {ThemeColorCard_v2, ThemeColorSchemes_v2} from './color'
import type {ThemeInput_v2} from './input'

/** @public */
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
/** @public */
export type Theme_v2 = Omit<RootTheme_v2, 'color'> & {
  color: ThemeColorCard_v2
  /**
   * Indicates whether the theme is resolved or raw, it's necessary to avoid issues
   * with sanity V2 components accessing a v1 <ThemeProvider>.
   * See https://github.com/sanity-io/ui/pull/1203 for more info.
   */
  _resolved: boolean
}
