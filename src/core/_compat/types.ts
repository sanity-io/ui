// This file re-exports API members which existed in the `@sanity/ui` export in v1.

import {
  type BaseTheme as _BaseTheme,
  type ThemeBoxShadow,
  type HSL as _HSL,
  type PartialThemeColorBuilderOpts,
  type RGB as _RGB,
  type RootTheme as _RootTheme,
  type ThemeStyles,
  type Theme as _Theme,
  type ThemeAvatar,
  type ThemeColor,
  type ThemeColorBase,
  type ThemeColorBuilderOpts,
  type ThemeColorButton,
  type ThemeColorButtonModeKey as _ThemeColorButtonModeKey,
  type ThemeColorButtonStates,
  type ThemeColorButtonTones,
  type ThemeColorCard,
  type ThemeColorGenericState,
  type ThemeColorInput,
  type ThemeColorInputState,
  type ThemeColorInputStates,
  type ThemeColorMuted,
  type ThemeColorMutedTone,
  type ThemeColorName,
  type ThemeColorScheme,
  type ThemeColorSchemeKey as _ThemeColorSchemeKey,
  type ThemeColorSchemes,
  type ThemeColorSelectable,
  type ThemeColorSelectableStates,
  type ThemeColorSolid,
  type ThemeColorSolidTone,
  type ThemeColorSpot,
  type ThemeColorSpotKey,
  type ThemeColorSyntax as _ThemeColorSyntax,
  type ThemeColorToneKey,
  type ThemeFont as _ThemeFont,
  type ThemeFontKey as _ThemeFontKey,
  type ThemeFontSize as _ThemeFontSize,
  type ThemeFontWeight as _ThemeFontWeight,
  type ThemeFontWeightKey as _ThemeFontWeightKey,
  type ThemeFonts as _ThemeFonts,
  type ThemeInput,
  type ThemeLayer as _ThemeLayer,
  type ThemeShadow as _ThemeShadow,
  type ThemeColorButtonState,
  type ThemeColorCardState,
  type ThemeColorSelectableState,
  buildTheme,
} from '@sanity/ui/theme'

/**
 * @public
 * @deprecated Use `BaseTheme` from `@sanity/ui/theme` instead.
 */
export type BaseTheme = _BaseTheme

/**
 * @public
 * @deprecated Use `ThemeBoxShadow` from `@sanity/ui/theme` instead.
 */
export type BoxShadow = ThemeBoxShadow

/**
 * @public
 * @deprecated Use `HSL` from `@sanity/ui/theme` instead.
 */
export type HSL = _HSL

/**
 * @public
 * @deprecated Use `RGB` from `@sanity/ui/theme` instead.
 */
export type RGB = _RGB

/**
 * @public
 * @deprecated Use `RootTheme` from `@sanity/ui/theme` instead.
 */
export type RootTheme = _RootTheme

/**
 * @public
 * @deprecated Use `ThemeStyles` from `@sanity/ui/theme` instead.
 */
export type Styles = ThemeStyles

/**
 * @public
 * @deprecated Use `Theme` from `@sanity/ui/theme` instead.
 */
export type Theme = _Theme

/**
 * @public
 * @deprecated Use `ThemeColorButtonModeKey` from `@sanity/ui/theme` instead.
 */
export type ThemeColorButtonModeKey = _ThemeColorButtonModeKey

/**
 * @public
 * @deprecated Use `ThemeColorSchemeKey` from `@sanity/ui/theme` instead.
 */
export type ThemeColorSchemeKey = _ThemeColorSchemeKey

/**
 * @public
 * @deprecated Use `ThemeColorSyntax` from `@sanity/ui/theme` instead.
 */
export type ThemeColorSyntax = _ThemeColorSyntax

/**
 * @public
 * @deprecated Use `ThemeFont` from `@sanity/ui/theme` instead.
 */
export type ThemeFont = _ThemeFont

/**
 * @public
 * @deprecated Use `ThemeFontKey` from `@sanity/ui/theme` instead.
 */
export type ThemeFontKey = _ThemeFontKey

/**
 * @public
 * @deprecated Use `ThemeFontSize` from `@sanity/ui/theme` instead.
 */
export type ThemeFontSize = _ThemeFontSize

/**
 * @public
 * @deprecated Use `ThemeFontWeight` from `@sanity/ui/theme` instead.
 */
export type ThemeFontWeight = _ThemeFontWeight

/**
 * @public
 * @deprecated Use `ThemeFontWeightKey` from `@sanity/ui/theme` instead.
 */
export type ThemeFontWeightKey = _ThemeFontWeightKey

/**
 * @public
 * @deprecated Use `ThemeFonts` from `@sanity/ui/theme` instead.
 */
export type ThemeFonts = _ThemeFonts

/**
 * @public
 * @deprecated Use `ThemeLayer` from `@sanity/ui/theme` instead.
 */
export type ThemeLayer = _ThemeLayer

/**
 * @public
 * @deprecated Use `ThemeShadow` from `@sanity/ui/theme` instead.
 */
export type ThemeShadow = _ThemeShadow

export {
  type PartialThemeColorBuilderOpts,
  type ThemeAvatar,
  type ThemeColor,
  type ThemeColorBase,
  type ThemeColorBuilderOpts,
  type ThemeColorButton,
  type ThemeColorButtonStates,
  type ThemeColorButtonTones,
  type ThemeColorCard,
  type ThemeColorGenericState,
  type ThemeColorInput,
  type ThemeColorInputState,
  type ThemeColorInputStates,
  type ThemeColorMuted,
  type ThemeColorMutedTone,
  type ThemeColorName,
  type ThemeColorScheme,
  type ThemeColorSchemes,
  type ThemeColorSelectable,
  type ThemeColorSelectableStates,
  type ThemeColorSolid,
  type ThemeColorSolidTone,
  type ThemeColorSpot,
  type ThemeColorSpotKey,
  type ThemeColorToneKey,
  type ThemeInput,
  type ThemeColorButtonState,
  type ThemeColorCardState,
  type ThemeColorSelectableState,
}

import {
  createColorTheme as _createColorTheme,
  hexToRgb as _hexToRgb,
  hslToRgb as _hslToRgb,
  multiply as _multiply,
  parseColor as _parseColor,
  rgbToHex as _rgbToHex,
  rgbToHsl as _rgbToHsl,
  rgba as _rgba,
  screen as _screen,
} from '@sanity/ui/theme'

/**
 * @public
 * @deprecated Use `createColorTheme` from `@sanity/ui/theme` instead.
 */
export const createColorTheme = _createColorTheme

/**
 * @public
 * @deprecated Use `hexToRgb` from `@sanity/ui/theme` instead.
 */
export const hexToRgb = _hexToRgb

/**
 * @public
 * @deprecated Use `hslToRgb` from `@sanity/ui/theme` instead.
 */
export const hslToRgb = _hslToRgb

/**
 * @public
 * @deprecated Use `multiply` from `@sanity/ui/theme` instead.
 */
export const multiply = _multiply

/**
 * @public
 * @deprecated Use `parseColor` from `@sanity/ui/theme` instead.
 */
export const parseColor = _parseColor

/**
 * @public
 * @deprecated Use `rgbToHex` from `@sanity/ui/theme` instead.
 */
export const rgbToHex = _rgbToHex

/**
 * @public
 * @deprecated Use `rgbToHsl` from `@sanity/ui/theme` instead.
 */
export const rgbToHsl = _rgbToHsl

/**
 * @public
 * @deprecated Use `rgba` from `@sanity/ui/theme` instead.
 */
export const rgba = _rgba

/**
 * @public
 * @deprecated Use `screen` from `@sanity/ui/theme` instead.
 */
export const screen = _screen

/**
 * @public
 * @deprecated Use `buildTheme` from `@sanity/ui/theme` instead.
 */
export const studioTheme = buildTheme()
