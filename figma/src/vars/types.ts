import {
  ThemeColorAvatarColorKey,
  ThemeColorButtonModeKey,
  ThemeColorInputModeKey,
  ThemeColorInputStateKey,
  ThemeColorSchemeKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
} from '@sanity/ui/theme'

export const INPUT_KEYS = ['bg', 'border', 'fg', 'muted-bg', 'placeholder'] as const
export type InputColorKey = (typeof INPUT_KEYS)[number]

export const STATE_KEYS = [
  'bg',
  'fg',
  'icon',
  'border',
  'muted-bg',
  'muted-fg',
  'accent-fg',
  'link-fg',
  'code-bg',
  'code-fg',

  'skeleton-from',
  'skeleton-to',

  'avatar/gray/bg',
  'avatar/gray/fg',
  'avatar/blue/bg',
  'avatar/blue/fg',
  'avatar/purple/bg',
  'avatar/purple/fg',
  'avatar/magenta/bg',
  'avatar/magenta/fg',
  'avatar/red/bg',
  'avatar/red/fg',
  'avatar/orange/bg',
  'avatar/orange/fg',
  'avatar/yellow/bg',
  'avatar/yellow/fg',
  'avatar/green/bg',
  'avatar/green/fg',
  'avatar/cyan/bg',
  'avatar/cyan/fg',

  'badge/default/bg',
  'badge/default/border',
  'badge/default/dot',
  'badge/default/fg',
  'badge/default/icon',

  'badge/primary/bg',
  'badge/primary/border',
  'badge/primary/dot',
  'badge/primary/fg',
  'badge/primary/icon',

  'badge/positive/bg',
  'badge/positive/border',
  'badge/positive/dot',
  'badge/positive/fg',
  'badge/positive/icon',

  'badge/caution/bg',
  'badge/caution/border',
  'badge/caution/dot',
  'badge/caution/fg',
  'badge/caution/icon',

  'badge/critical/bg',
  'badge/critical/border',
  'badge/critical/dot',
  'badge/critical/fg',
  'badge/critical/icon',

  'kbd-bg',
  'kbd-fg',
  'kbd-border',
] as const
export type StateColorKey = (typeof STATE_KEYS)[number]

export const BASE_KEYS = [...STATE_KEYS, 'focusRing', 'shadow-outline'] as const
export type BaseColorKey = (typeof BASE_KEYS)[number]

export interface FigmaSanityUIColorVariable {
  scheme: 'light' | 'dark'
  tone: 'default' | 'transparent' | 'primary' | 'positive' | 'caution' | 'critical'
  key:
    | BaseColorKey
    | `avatar/${ThemeColorAvatarColorKey}/${'bg' | 'fg'}`
    | `button/${ThemeColorButtonModeKey}/${ThemeColorStateToneKey}/${ThemeColorStateKey}/${StateColorKey}`
    | `input/${ThemeColorInputModeKey}/${ThemeColorInputStateKey}/${InputColorKey}`
    | `selectable/${ThemeColorStateToneKey}/${ThemeColorStateKey}/${StateColorKey}`
  value?: string
}

export const SCHEMES: ThemeColorSchemeKey[] = ['light', 'dark']
