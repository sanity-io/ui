import {ColorTints} from '@sanity/color'

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
export interface ThemeColorSchemes {
  // Could we update this to only return Record<ThemeColorName ,  keyof typeof hues> ? Then the function that assigns the color would search the ColorTint
  tones: Record<ThemeColorName, ColorTints>
}

/**
 * @beta
 */
export type CSSVariableKey = ThemeColorName & ('spot' | 'syntax' | 'mutable')
