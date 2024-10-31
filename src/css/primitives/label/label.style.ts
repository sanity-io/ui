import {FONT_LABEL_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.label': {
    '--font-weight-regular': `var(--font-label-weight-regular)`,
    '--font-weight-medium': `var(--font-label-weight-medium)`,
    '--font-weight-semibold': `var(--font-label-weight-semibold)`,
    '--font-weight-bold': `var(--font-label-weight-bold)`,

    '--font-family': `var(--font-label-family)`,
    '--font-feature-settings': `var(--font-label-feature-settings)`,

    'color': 'var(--color-fg)',
    'textTransform': 'uppercase',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  '.label-accent': {
    '--color-fg': 'var(--color-accent-fg)',
  },

  '.label-muted': {
    '--color-fg': 'var(--color-muted-fg)',
  },
}

for (const size of FONT_LABEL_SIZE) {
  _responsiveRule(primitive, `label-${size}`, {
    '--font-size': `var(--font-label-${size}-size)`,
    '--font-line-height': `var(--font-label-${size}-line-height)`,
    '--font-letter-spacing': `var(--font-label-${size}-letter-spacing)`,
    '--font-icon-size': `var(--font-label-${size}-icon-size)`,
    '--font-ascender-height': `var(--font-label-${size}-ascender-height)`,
    '--font-descender-height': `var(--font-label-${size}-descender-height)`,
    // '--font-cap-height': `var(--font-label-${size}-cap-height)`,
  })
}

export const labelStyle: Style = {layers: {primitive}}
