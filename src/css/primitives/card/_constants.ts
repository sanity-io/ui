import {ThemeColorCardToneKey} from '@sanity/ui/theme'

export const toneMap: Record<ThemeColorCardToneKey | 'inherit', string | undefined> = {
  transparent: 'canvas',
  default: 'surface',
  neutral: 'neutral',
  suggest: 'suggest',
  primary: 'accent',
  positive: 'positive',
  caution: 'caution',
  critical: 'critical',
  inherit: undefined,
} as const
