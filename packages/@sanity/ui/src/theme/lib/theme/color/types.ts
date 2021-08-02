import {ThemeColorBase} from './base'
import {ThemeColorButton} from './button'
import {ThemeColorCard} from './card'
import {ThemeColorInput} from './input'
import {ThemeColorMenuItem} from './menuItem'
import {ThemeColorMuted} from './muted'
import {ThemeColorSolid} from './solid'
import {ThemeColorSpot} from './spot'
import {ThemeColorSyntax} from './syntax'

/**
 * @public
 */
export type ThemeColorSchemeKey = 'dark' | 'light'

/**
 * @public
 */
export type ThemeColorName =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'positive'
  | 'caution'
  | 'critical'

/**
 * @public
 */
export type ThemeColorToneKey =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'positive'
  | 'caution'
  | 'critical'

/**
 * @public
 */
export interface ThemeColor {
  dark: boolean
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCard
  input: ThemeColorInput
  menuItem: ThemeColorMenuItem
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
  solid: ThemeColorSolid
  muted: ThemeColorMuted
}

/**
 * @public
 */
export interface ThemeColorScheme {
  default: ThemeColor
  transparent: ThemeColor
  primary: ThemeColor
  positive: ThemeColor
  caution: ThemeColor
  critical: ThemeColor
}

/**
 * @public
 */
export interface ThemeColorSchemes {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}
