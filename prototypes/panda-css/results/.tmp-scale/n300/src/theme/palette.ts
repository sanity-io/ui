/**
 * Raw palette (shape borrowed from `@sanity/color`): hues × tints. Used by
 * `panda.config.ts` to declare the `colors` tokens and by the runtime theme to
 * compute default semantic values, so both sides agree on one source of truth.
 */
export const hues = {
  gray: {
    50: '#f6f6f8',
    100: '#eeeef1',
    200: '#e3e4e8',
    300: '#bbbdc9',
    400: '#9499ad',
    500: '#727892',
    600: '#515870',
    700: '#383d51',
    800: '#252837',
    900: '#1b1d27',
    950: '#13141b',
  },
  blue: {
    50: '#f5f8ff',
    100: '#e5edff',
    200: '#cfdeff',
    300: '#99b7ff',
    400: '#6690ff',
    500: '#3e6bff',
    600: '#2a4fd9',
    700: '#1e3bb3',
    800: '#1a2f85',
    900: '#17255e',
    950: '#111a40',
  },
  green: {
    50: '#f0fbf5',
    100: '#d9f5e6',
    200: '#b4ebcd',
    300: '#7fd7a8',
    400: '#4ec082',
    500: '#2fa666',
    600: '#1f8651',
    700: '#1a6b43',
    800: '#165536',
    900: '#12452e',
    950: '#0c2b1d',
  },
  yellow: {
    50: '#fefaec',
    100: '#fcf3cf',
    200: '#f9e59b',
    300: '#f4d05e',
    400: '#efbb2a',
    500: '#d99e0f',
    600: '#b47d0c',
    700: '#8f600e',
    800: '#724c12',
    900: '#5e3f13',
    950: '#3c2609',
  },
  red: {
    50: '#fef5f5',
    100: '#fde6e6',
    200: '#fbcfcf',
    300: '#f7a3a3',
    400: '#f17373',
    500: '#e64747',
    600: '#c53232',
    700: '#a32626',
    800: '#862222',
    900: '#6f2020',
    950: '#471010',
  },
} as const

export type Hue = keyof typeof hues
export type Tint = keyof (typeof hues)['gray']

export const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const
export type Tone = (typeof tones)[number]

export const toneHue: Record<Tone, Hue> = {
  default: 'gray',
  primary: 'blue',
  positive: 'green',
  caution: 'yellow',
  critical: 'red',
}
