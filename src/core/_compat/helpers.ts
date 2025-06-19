import {
  createColorTheme as _createColorTheme,
  hexToRgb as _hexToRgb,
  hslToRgb as _hslToRgb,
  multiply as _multiply,
  parseColor as _parseColor,
  rgba as _rgba,
  rgbToHex as _rgbToHex,
  rgbToHsl as _rgbToHsl,
  screen as _screen,
} from '@sanity/ui/theme'

export {
  /** @deprecated use `px` from `@sanity/ui/css` */
  px,
  /** @deprecated use `rem` from `@sanity/ui/css` */
  rem,
} from '@sanity/ui/css'

/**
 * @public
 * @deprecated Use `createColorTheme` from `@sanity/ui/theme` instead.
 */
export const createColorTheme: typeof _createColorTheme = _createColorTheme

/**
 * @public
 * @deprecated Use `hexToRgb` from `@sanity/ui/theme` instead.
 */
export const hexToRgb: typeof _hexToRgb = _hexToRgb

/**
 * @public
 * @deprecated Use `hslToRgb` from `@sanity/ui/theme` instead.
 */
export const hslToRgb: typeof _hslToRgb = _hslToRgb

/**
 * @public
 * @deprecated Use `multiply` from `@sanity/ui/theme` instead.
 */
export const multiply: typeof _multiply = _multiply

/**
 * @public
 * @deprecated Use `parseColor` from `@sanity/ui/theme` instead.
 */
export const parseColor: typeof _parseColor = _parseColor

/**
 * @public
 * @deprecated Use `rgbToHex` from `@sanity/ui/theme` instead.
 */
export const rgbToHex: typeof _rgbToHex = _rgbToHex

/**
 * @public
 * @deprecated Use `rgbToHsl` from `@sanity/ui/theme` instead.
 */
export const rgbToHsl: typeof _rgbToHsl = _rgbToHsl

/**
 * @public
 * @deprecated Use `rgba` from `@sanity/ui/theme` instead.
 */
export const rgba: typeof _rgba = _rgba

/**
 * @public
 * @deprecated Use `screen` from `@sanity/ui/theme` instead.
 */
export const screen: typeof _screen = _screen
