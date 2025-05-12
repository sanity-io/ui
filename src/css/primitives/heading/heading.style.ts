import {FONT_HEADING_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.heading': {
    '--font-weight-regular': `var(--font-heading-weight-regular)`,
    '--font-weight-medium': `var(--font-heading-weight-medium)`,
    '--font-weight-semibold': `var(--font-heading-weight-semibold)`,
    '--font-weight-bold': `var(--font-heading-weight-bold)`,

    '--font-family': `var(--font-heading-family)`,
    '--font-feature-settings': `var(--font-heading-feature-settings)`,

    'color': 'var(--color-fg)',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  // '.heading-accent': {
  //   '--color-fg': 'var(--color-accent-fg)',
  // },

  '.heading-muted': {
    '--color-fg': 'var(--color-tinted-default-fg-4)',
  },
}

for (const size of FONT_HEADING_SIZE) {
  _responsiveRule(primitive, `heading-${size}`, {
    '--font-size': `var(--font-heading-${size}-size)`,
    '--font-line-height': `var(--font-heading-${size}-line-height)`,
    '--font-letter-spacing': `var(--font-heading-${size}-letter-spacing)`,
    '--font-icon-size': `var(--font-heading-${size}-icon-size)`,
    '--font-ascender-height': `var(--font-heading-${size}-ascender-height)`,
    '--font-descender-height': `var(--font-heading-${size}-descender-height)`,
    // '--font-cap-height': `var(--font-heading-${size}-cap-height)`,
  })
}

export const headingStyle: Style = {layers: {primitive}}
