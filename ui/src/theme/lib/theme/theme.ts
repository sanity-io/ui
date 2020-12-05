import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes} from './color'
import {ThemeFonts, ThemeFontWeightKey} from './fonts'
import {ThemeInput} from './input'
import {ThemeShadow} from './shadow'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseTheme<Styles extends {} = {}> {
  avatar: ThemeAvatar
  button: {
    textWeight: ThemeFontWeightKey
  }
  color: ThemeColorSchemes
  container: number[]
  fonts: ThemeFonts
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput
  styles?: Styles
}
