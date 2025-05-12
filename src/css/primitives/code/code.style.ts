import {FONT_CODE_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.code': {
    '--font-weight-regular': `var(--font-code-weight-regular)`,
    '--font-weight-medium': `var(--font-code-weight-medium)`,
    '--font-weight-semibold': `var(--font-code-weight-semibold)`,
    '--font-weight-bold': `var(--font-code-weight-bold)`,

    '--font-family': `var(--font-code-family)`,
    '--font-feature-settings': `var(--font-code-feature-settings)`,

    'color': 'var(--color-code-fg)',

    '@nest': {
      '& > code': {
        fontFamily: 'inherit',
      },

      // & code {
      //   font-family: inherit;

      //   &.refractor .token {
      //     ${codeSyntaxHighlightingStyle}
      //   }
      // }

      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
        borderRadius: '1px',
      },

      '& svg': {
        // Some popular CSS libraries change the defaults for SVG display
        // Make sure SVGs are rendered as inline elements
        display: 'inline',
      },

      '& [data-sanity-icon]': {
        verticalAlign: 'baseline',
      },
    },
  },
}

for (const size of FONT_CODE_SIZE) {
  _responsiveRule(primitive, `code-${size}`, {
    '--font-size': `var(--font-code-${size}-size)`,
    '--font-line-height': `var(--font-code-${size}-line-height)`,
    '--font-letter-spacing': `var(--font-code-${size}-letter-spacing)`,
    '--font-icon-size': `var(--font-code-${size}-icon-size)`,
    '--font-ascender-height': `var(--font-code-${size}-ascender-height)`,
    '--font-descender-height': `var(--font-code-${size}-descender-height)`,
    // '--font-cap-height': `var(--font-code-${size}-cap-height)`,
  })
}

export const codeStyle: Style = {layers: {primitive}}
