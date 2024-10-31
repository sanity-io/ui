import {ThemeColorButtonModeKey, ThemeColorStateToneKey} from '@sanity/ui/theme'

export const toneMap: Record<ThemeColorStateToneKey, string | undefined> = {
  default: 'surface',
  neutral: 'neutral',
  suggest: 'suggest',
  primary: 'accent',
  positive: 'positive',
  caution: 'caution',
  critical: 'critical',
} as const

export const variantMap: Record<ThemeColorButtonModeKey, string | undefined> = {
  default: 'solid',
  ghost: 'ghost',
  bleed: 'tinted',
} as const
