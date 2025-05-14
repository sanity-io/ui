import {FONT_TEXT_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.text': {
    '--font-weight-regular': `var(--font-text-weight-regular)`,
    '--font-weight-medium': `var(--font-text-weight-medium)`,
    '--font-weight-semibold': `var(--font-text-weight-semibold)`,
    '--font-weight-bold': `var(--font-text-weight-bold)`,

    '--font-family': `var(--font-text-family)`,
    '--font-feature-settings': `var(--font-text-feature-settings)`,

    'color': 'var(--color-fg)',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },

      '& a:hover': {
        color: 'var(--color-fg)',
      },

      '& code': {
        fontFamily: vars.font.code.family,
        color: 'var(--color-code-fg)',
        backgroundColor: 'var(--color-muted-bg)',
        borderRadius: vars.radius[2],
      },

      '& svg': {
        color: 'var(--color-muted-fg)',
      },
    },
  },

  // 'text-accent': {
  //   '--color-fg': 'var(--color-accent-fg)',
  // },

  '.text-muted': {
    color: 'var(--color-muted-fg)',
    // '--color-fg': 'var(--color-tinted-default-fg-4)',
  },
}

for (const size of FONT_TEXT_SIZE) {
  _responsiveRule(primitive, `text-${size}`, {
    '--font-size': `var(--font-text-${size}-size)`,
    '--font-line-height': `var(--font-text-${size}-line-height)`,
    '--font-letter-spacing': `var(--font-text-${size}-letter-spacing)`,
    '--font-icon-size': `var(--font-text-${size}-icon-size)`,
    '--font-ascender-height': `var(--font-text-${size}-ascender-height)`,
    '--font-descender-height': `var(--font-text-${size}-descender-height)`,
    // '--font-cap-height': `var(--font-text-${size}-cap-height)`,
  })
}

export const textStyle: Style = {layers: {primitive}}
