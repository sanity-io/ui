import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Rules} from '../../types'

export const badgeRules: Rules = {
  badge: {
    backgroundColor: `var(--color-bg)`,
    color: `var(--color-fg)`,
    verticalAlign: 'top',
  },

  ...THEME_COLOR_STATE_TONES.reduce(
    (acc, tone) => ({
      ...acc,
      [`badge-${tone}`]: {
        [`--color-bg`]: `var(--color-tinted-${tone}-bg-2)`,
        [`--color-fg`]: `var(--color-tinted-${tone}-fg-2)`,
        // [`--color-icon`]: `var(--color-tinted-${tone}-fg-4)`,
      },
    }),
    {} as Rules,
  ),
}
