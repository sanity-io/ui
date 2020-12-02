import {ThemeAvatar} from './avatar'
import {ThemeColorSchemes} from './color'
import {ThemeFonts} from './fonts'
import {ThemeInput} from './input'
import {ThemeShadow} from './shadow'

export type ThemeTextWeight = 'regular' | 'medium' | 'semibold' | 'bold'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface BaseTheme<Styles extends {} = {}> {
  avatar: ThemeAvatar
  button: {
    textWeight: ThemeTextWeight
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
