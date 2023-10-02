/**
 * This file creates a translation between the tints and the studio colors
 * Providing readable names, and allowing to mix colors and tints in the same ThemeColor.
 * e.g. for positive theme: `{"bg_base": "white", "bg_base_hover": "gray/50", "bg_base_active": "cyan/50"}
 * This is not possible in the previous configuration, as each ThemeColor uses only one tint.
 */
import {ColorTintKey, ColorTints, ColorValue, black, hues, white} from '@sanity/color'
import {ThemeColorName, ThemeColorSchemeKey} from '../lib/theme'

export const colorKeys = [
  'text_primary',
  'text_secondary',
  'bg_base',
  'bg_base_hover',
  'bg_base_active',
  'bg_accent',
  'bg_accent_hover',
  'bg_accent_active',
  'bg_tint',
  'icon_default',
  'icon_inverted',
  'border_base',
  'border_accent',
  'border_accent_inverted',
] as const

export type ColorKey = (typeof colorKeys)[number]

type ColorTintsDictionary = Record<ColorKey, ColorTintKey | ColorValue>
const defaultTints: Record<ThemeColorSchemeKey, ColorTintsDictionary> = {
  light: {
    text_primary: '900',
    text_secondary: '600',
    bg_base: white,
    bg_base_hover: '50',
    bg_base_active: '100',
    bg_accent: '500',
    bg_accent_hover: '600',
    bg_accent_active: '700',
    bg_tint: '50',
    icon_default: '500',
    icon_inverted: white,
    border_base: '100',
    border_accent: '500',
    border_accent_inverted: white,
  },
  dark: {
    text_primary: '50',
    text_secondary: '300',
    bg_base: black,
    bg_base_hover: '900',
    bg_base_active: '800',
    bg_accent: '500',
    bg_accent_hover: '400',
    bg_accent_active: '300',
    bg_tint: '900',
    icon_default: '300',
    icon_inverted: hues.gray[900],
    border_base: '900',
    border_accent: '300',
    border_accent_inverted: hues.gray[900],
  },
}

export const colorTints: Record<
  ThemeColorSchemeKey,
  Record<ThemeColorName, ColorTintsDictionary>
> = {
  light: {
    default: {
      ...defaultTints.light,
      bg_accent: '900',
      bg_accent_hover: '950',
      bg_accent_active: black,
      border_accent: '600',
    },
    primary: {
      ...defaultTints.light,
      bg_accent: '900',
      bg_accent_hover: '950',
      bg_accent_active: black,
      border_accent: '600',
    },
    positive: {
      ...defaultTints.light,
      bg_base_hover: hues.gray[50],
      bg_base_active: '50',
      bg_accent: '400',
      bg_accent_hover: '500',
      bg_accent_active: '600',
      border_accent: '400',
    },
    transparent: defaultTints.light,
    caution: defaultTints.light,
    critical: defaultTints.light,
  },
  dark: {
    default: {
      ...defaultTints.dark,
      text_primary: white,
      bg_accent: white,
      bg_accent_hover: '50',
      bg_accent_active: '100',
    },
    primary: {
      ...defaultTints.dark,
      text_primary: white,
      bg_accent: white,
      bg_accent_hover: '50',
      bg_accent_active: '100',
    },
    positive: {
      ...defaultTints.dark,
      bg_base_hover: hues.gray[900],
      bg_base_active: '900',
      bg_accent: '400',
      bg_accent_hover: '300',
      bg_accent_active: '200',
      border_accent: '400',
    },
    transparent: defaultTints.dark,
    caution: defaultTints.dark,
    critical: defaultTints.dark,
  },
}

export const getColor = (
  tints: ColorTints,
  dark: boolean,
  tone: ThemeColorName,
  key: ColorKey,
): string => {
  const value = colorTints[dark ? 'dark' : 'light'][tone][key]

  if (typeof value === 'string') {
    return tints[value].hex
  }

  return value.hex
}

export const getColorValue = (
  tints: ColorTints,
  dark: boolean,
  tone: ThemeColorName,
  key: ColorKey,
): ColorValue => {
  const value = colorTints[dark ? 'dark' : 'light'][tone][key]

  if (typeof value === 'string') {
    return tints[value]
  }

  return value
}
