import {ThemeColorAvatar} from './avatar'
import {ThemeColorBadge} from './badge'
import {ThemeColorButton} from './button'
import {ThemeColorCard} from './card'
import {ThemeColorInput} from './input'
import {ThemeColorSwitch} from './switch'
import {ThemeColorSyntax} from './syntax'

export * from './avatar'
export * from './badge'
export * from './button'
export * from './card'
export * from './input'
export * from './switch'
export * from './syntax'

export interface ThemeColorScheme {
  avatar: ThemeColorAvatar
  badge: ThemeColorBadge
  button: ThemeColorButton
  card: ThemeColorCard
  input: ThemeColorInput
  syntax: ThemeColorSyntax
  switch: ThemeColorSwitch
}

export interface ThemeColor {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}
