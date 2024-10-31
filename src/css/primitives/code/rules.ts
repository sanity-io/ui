import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const codeRules: Rules = {
  code: {
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

  ...responsiveRules('code-0', {
    '--font-size': 'var(--font-code-0-size)',
    '--font-line-height': 'var(--font-code-0-line-height)',
    '--font-letter-spacing': 'var(--font-code-0-letter-spacing)',
    '--font-icon-size': 'var(--font-code-0-icon-size)',
    '--font-ascender-height': 'var(--font-code-0-ascender-height)',
    '--font-descender-height': 'var(--font-code-0-descender-height)',
    // '--font-cap-height': 'var(--font-code-0-cap-height)',
  }),

  ...responsiveRules('code-1', {
    '--font-size': 'var(--font-code-1-size)',
    '--font-line-height': 'var(--font-code-1-line-height)',
    '--font-letter-spacing': 'var(--font-code-1-letter-spacing)',
    '--font-icon-size': 'var(--font-code-1-icon-size)',
    '--font-ascender-height': 'var(--font-code-1-ascender-height)',
    '--font-descender-height': 'var(--font-code-1-descender-height)',
    // '--font-cap-height': 'var(--font-code-1-cap-height)',
  }),

  ...responsiveRules('code-2', {
    '--font-size': 'var(--font-code-2-size)',
    '--font-line-height': 'var(--font-code-2-line-height)',
    '--font-letter-spacing': 'var(--font-code-2-letter-spacing)',
    '--font-icon-size': 'var(--font-code-2-icon-size)',
    '--font-ascender-height': 'var(--font-code-2-ascender-height)',
    '--font-descender-height': 'var(--font-code-2-descender-height)',
    // '--font-cap-height': 'var(--font-code-2-cap-height)',
  }),

  ...responsiveRules('code-3', {
    '--font-size': 'var(--font-code-3-size)',
    '--font-line-height': 'var(--font-code-3-line-height)',
    '--font-letter-spacing': 'var(--font-code-3-letter-spacing)',
    '--font-icon-size': 'var(--font-code-3-icon-size)',
    '--font-ascender-height': 'var(--font-code-3-ascender-height)',
    '--font-descender-height': 'var(--font-code-3-descender-height)',
    // '--font-cap-height': 'var(--font-code-3-cap-height)',
  }),

  ...responsiveRules('code-4', {
    '--font-size': 'var(--font-code-4-size)',
    '--font-line-height': 'var(--font-code-4-line-height)',
    '--font-letter-spacing': 'var(--font-code-4-letter-spacing)',
    '--font-icon-size': 'var(--font-code-4-icon-size)',
    '--font-ascender-height': 'var(--font-code-4-ascender-height)',
    '--font-descender-height': 'var(--font-code-4-descender-height)',
    // '--font-cap-height': 'var(--font-code-4-cap-height)',
  }),
}
