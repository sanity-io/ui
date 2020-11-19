import {ThemeAvatar} from './avatar'
import {ThemeColor} from './color'
import {ThemeFonts} from './fonts'
import {ThemeInput} from './input'
import {ThemeShadow} from './shadow'

export * from './avatar'
export * from './color'
export * from './fonts'
export * from './input'
export * from './shadow'

export type AvatarColorKey =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'

export type ThemeColorSchemeKey = 'dark' | 'light'

export interface Theme {
  avatar: ThemeAvatar
  color: ThemeColor
  container: number[]
  fonts: ThemeFonts
  media: number[]
  radius: number[]
  shadows: Array<ThemeShadow | null>
  space: number[]
  input: ThemeInput
}
