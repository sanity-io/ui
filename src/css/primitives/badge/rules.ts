import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import type {Rules} from '../../types'

const badgeToneRules: Rules = {}

for (const tone of THEME_COLOR_STATE_TONES) {
  badgeToneRules[`badge-${tone}`] = {
    '--color-bg': `var(--color-tinted-${tone}-bg-4)`,
    '--color-fg': `var(--color-tinted-${tone}-fg-1)`,
  }
}

export const badgeRules: Rules = {
  badge: {
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-fg)',
    verticalAlign: 'top',
  },

  ...badgeToneRules,
}
