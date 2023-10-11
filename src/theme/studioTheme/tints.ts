/**
 * This file creates a translation between the tints and the studio colors
 * Providing readable names, and allowing to mix colors and tints in the same ThemeColor.
 * e.g. for positive theme: `{"bg_base": "white", ""bg-base-hover"": "gray/50", ""bg-base-active"": "cyan/50"}
 * This is not possible in the previous configuration, as each ThemeColor uses only one tint.
 */
import {ColorTintKey, ColorTints, ColorTint, black, hues, white} from '@sanity/color'
import {rgba} from '../lib/color-fns'
import {ThemeColorName, ThemeColorSchemeKey} from '../lib/theme'

export const colorKeys = [
  'text-primary',
  'text-secondary',
  'text-inactive',
  // TODO: Can this be replaced by other of the text colors? It's used by the code html element if it's inside a text
  'text-code',
  'text-muted',
  'bg-base',
  'bg-base-hover',
  'bg-base-active',
  'bg-accent',
  'bg-accent-hover',
  'bg-accent-active',
  'bg-tint',
  // TODO: Can we replace this with bg_tint?  It's used by the code html element if it's inside a text
  'bg-tint-code',

  'icon-default',
  'icon-inverted',
  'border-base',
  'border-base-hover',
  'border-accent',
  'border-accent-inverted',

  // Colors starting with -base won't be affected by the mix function
  'base-bg-card', // This is used by the card when a tone is defined, it will also override the bg-base in the rest of the components.
  'base-bg-raw', // This is the same color as bg-base, but it won't be overridden by the card bg color, used in selectable items.

  'base-shadow-outline-color',
  'base-shadow-umbra-color',
  'base-shadow-penumbra-color',
  'base-shadow-ambient-color',
  'base-text-color', // Color used by the buttons for default mode text

  'skeleton-from',
  'skeleton-to',
] as const

export type ColorKey = (typeof colorKeys)[number]

type ColorWithOpacity = {
  type: 'colorWithOpacity'
  tint: ColorTintKey
  /**
   * Number between 0 and 1
   */
  opacity: number
}

type DefaultColor = {
  type: 'colorTint'
  value: ColorTint
}

type ColorTintsDictionary = Record<ColorKey, ColorTintKey | DefaultColor | ColorWithOpacity>
const defaultTints: Record<ThemeColorSchemeKey, ColorTintsDictionary> = {
  light: {
    'text-primary': '900',
    'text-secondary': '600',
    'text-inactive': '500',
    'text-code': '600',
    'text-muted': '600',
    'bg-base': {
      type: 'colorTint',
      value: white,
    },
    'bg-base-hover': '50',
    'bg-base-active': '100',
    'bg-accent': '500',
    'bg-accent-hover': '600',
    'bg-accent-active': '700',
    'bg-tint': '50',
    'bg-tint-code': '50',
    'icon-default': '500',
    'icon-inverted': {
      type: 'colorTint',
      value: white,
    },
    'border-base': '100',
    'border-base-hover': '200',
    'border-accent': '500',
    'border-accent-inverted': {
      type: 'colorTint',
      value: white,
    },
    'base-bg-card': '50',
    'base-bg-raw': {
      type: 'colorTint',
      value: white,
    },
    'base-text-color': {type: 'colorTint', value: white},
    'base-shadow-outline-color': {
      type: 'colorWithOpacity',
      tint: '500',
      opacity: 0.4,
    },
    'base-shadow-umbra-color': {
      type: 'colorWithOpacity',
      tint: '500',
      opacity: 0.2,
    },
    'base-shadow-penumbra-color': {
      type: 'colorWithOpacity',
      tint: '500',
      opacity: 0.14,
    },
    'base-shadow-ambient-color': {
      type: 'colorWithOpacity',
      tint: '500',
      opacity: 0.12,
    },
    'skeleton-from': '100',
    'skeleton-to': {
      type: 'colorWithOpacity',
      tint: '50',
      opacity: 0.5,
    },
  },
  dark: {
    'text-primary': '50',
    'text-secondary': '300',
    'text-inactive': '400',
    'text-code': '400',
    'text-muted': '400',
    'bg-base': {type: 'colorTint', value: black},
    'bg-base-hover': '900',
    'bg-base-active': '800',
    'bg-accent': '500',
    'bg-accent-hover': '400',
    'bg-accent-active': '300',
    'bg-tint': '900',
    'bg-tint-code': '950',
    'icon-default': '300',
    'icon-inverted': {type: 'colorTint', value: hues.gray[900]},
    'border-base': '800',
    'border-base-hover': '700',
    'border-accent': '300',
    'border-accent-inverted': {type: 'colorTint', value: hues.gray[900]},
    'base-bg-card': '950',
    'base-text-color': {type: 'colorTint', value: black},
    'base-shadow-outline-color': {
      type: 'colorWithOpacity',
      tint: '500',
      opacity: 0.4,
    },
    'base-shadow-umbra-color': {
      type: 'colorWithOpacity',
      tint: '900',
      opacity: 0.4,
    },
    'base-shadow-penumbra-color': {
      type: 'colorWithOpacity',
      tint: '900',
      opacity: 0.28,
    },
    'base-shadow-ambient-color': {
      type: 'colorWithOpacity',
      tint: '900',
      opacity: 0.24,
    },
    'base-bg-raw': {
      type: 'colorTint',
      value: black,
    },
    'skeleton-from': '900',
    'skeleton-to': {
      type: 'colorWithOpacity',
      tint: '50',
      opacity: 0.5,
    },
  },
}

export const colorTints: Record<
  ThemeColorSchemeKey,
  Record<ThemeColorName, ColorTintsDictionary>
> = {
  light: {
    default: {
      ...defaultTints.light,
      'base-bg-card': {type: 'colorTint', value: white},
      'bg-accent': '900',
      'bg-accent-hover': '950',
      'bg-accent-active': {type: 'colorTint', value: black},
      'border-accent': '600',
    },
    primary: {
      ...defaultTints.light,
      'bg-accent': '900',
      'bg-accent-hover': '950',
      'bg-accent-active': {type: 'colorTint', value: black},
      'border-accent': '600',
    },
    positive: {
      ...defaultTints.light,
      'bg-base-hover': {type: 'colorTint', value: hues.gray[50]},
      'bg-base-active': '50',
      'bg-accent': '400',
      'bg-accent-hover': '500',
      'bg-accent-active': '600',
      'border-accent': '400',
    },
    transparent: defaultTints.light,
    caution: defaultTints.light,
    critical: {...defaultTints.light, 'text-inactive': '300'},
  },
  dark: {
    default: {
      ...defaultTints.dark,
      'base-bg-card': {type: 'colorTint', value: black},
      'text-primary': {type: 'colorTint', value: white},
      'bg-accent': {type: 'colorTint', value: white},
      'bg-accent-hover': '50',
      'bg-accent-active': '100',
      'base-shadow-umbra-color': {
        type: 'colorWithOpacity',
        tint: '950',
        opacity: 0.4,
      },
      'base-shadow-penumbra-color': {
        type: 'colorWithOpacity',
        tint: '950',
        opacity: 0.28,
      },
      'base-shadow-ambient-color': {
        type: 'colorWithOpacity',
        tint: '950',
        opacity: 0.24,
      },
    },
    primary: {
      ...defaultTints.dark,
      'text-primary': {type: 'colorTint', value: white},
      'bg-accent': {type: 'colorTint', value: white},
      'bg-accent-hover': '50',
      'bg-accent-active': '100',
    },
    positive: {
      ...defaultTints.dark,
      'bg-base-hover': {type: 'colorTint', value: hues.gray[900]},
      'bg-base-active': '900',
      'bg-accent': '400',
      'bg-accent-hover': '300',
      'bg-accent-active': '200',
      'border-accent': '400',
    },
    transparent: defaultTints.dark,
    caution: defaultTints.dark,
    critical: {...defaultTints.dark, 'text-inactive': '700'},
  },
}

export const getColorValue = (
  tints: ColorTints,
  dark: boolean,
  tone: ThemeColorName,
  key: ColorKey,
): ColorTint => {
  const value = colorTints[dark ? 'dark' : 'light'][tone][key]

  if (typeof value === 'string') {
    return tints[value]
  }

  if (value.type === 'colorWithOpacity') {
    const base = tints[value.tint]

    return {
      hex: rgba(base.hex, value.opacity),
      title: `${base.title} ${Math.round(value.opacity * 100)}%`,
    }
  }

  return value.value
}

export const getColorHex = (
  tints: ColorTints,
  dark: boolean,
  tone: ThemeColorName,
  key: ColorKey,
): string => {
  return getColorValue(tints, dark, tone, key).hex
}
