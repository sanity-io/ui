import {
  ThemeColorButtonModeKey,
  ThemeColorInputModeKey,
  ThemeColorInputStateKey,
  ThemeColorSchemeKey,
  ThemeColorSpotKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
} from '@sanity/ui/theme'

export const INPUT_KEYS = [
  //
  'bg',
  'fg',
  'border',
] as const
export type InputColorKey = (typeof INPUT_KEYS)[number]

export const BASE_KEYS = [
  //
  'bg',
  'fg',
  'border',
  'focusRing',
  'shadow-outline',
] as const
export type BaseColorKey = (typeof BASE_KEYS)[number]

export const STATE_KEYS = [
  'bg',
  'bg2',
  'fg',
  'icon',
  'border',
  'muted-fg',
  'accent-fg',
  'link-fg',
  'code-bg',
  'code-fg',
  'skeleton-from',
  'skeleton-to',
] as const
export type StateColorKey = (typeof STATE_KEYS)[number]

export interface FigmaSanityUIColorVariable {
  scheme: 'light' | 'dark'
  tone: 'default' | 'transparent' | 'primary' | 'positive' | 'caution' | 'critical'
  key:
    | BaseColorKey
    | `avatar/${ThemeColorSpotKey}/${'bg' | 'fg'}`
    | `badge/${ThemeColorStateToneKey}/${'bg' | 'fg'}`
    | `button/${ThemeColorButtonModeKey}/${ThemeColorStateToneKey}/${ThemeColorStateKey}/${StateColorKey}`
    | `card/${ThemeColorStateKey}/${StateColorKey}`
    | `input/${ThemeColorInputModeKey}/${ThemeColorInputStateKey}/${InputColorKey}`
    | `kbd/${'bg' | 'fg' | 'border'}`
    | `selectable/${ThemeColorStateToneKey}/${ThemeColorStateKey}/${StateColorKey}`
  value?: string
}

export const SCHEMES: ThemeColorSchemeKey[] = ['light', 'dark']
