import {ColorTints} from '@sanity/color'
import {ThemeColorBase} from './base'
import {ThemeColorCard} from './card'
import {ThemeColorMuted} from './muted'
import {ThemeColorSelectable} from './selectable'
import {ThemeColorSolid} from './solid'

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
  card: ThemeColorCard
  selectable?: ThemeColorSelectable
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
  tones: Record<ThemeColorName, ColorTints>
  dark: ThemeColorScheme
  light: ThemeColorScheme
}
