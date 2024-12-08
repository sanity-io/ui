import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const headingRules: Rules = {
  'heading': {
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

  // 'heading-accent': {
  //   '--color-fg': 'var(--color-accent-fg)',
  // },

  'heading-muted': {
    '--color-fg': 'var(--color-tinted-default-fg-4)',
  },

  ...responsiveRules('heading-0', {
    '--font-size': 'var(--font-heading-0-size)',
    '--font-line-height': 'var(--font-heading-0-line-height)',
    '--font-letter-spacing': 'var(--font-heading-0-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-0-icon-size)',
    '--font-ascender-height': 'var(--font-heading-0-ascender-height)',
    '--font-descender-height': 'var(--font-heading-0-descender-height)',
  }),

  ...responsiveRules('heading-1', {
    '--font-size': 'var(--font-heading-1-size)',
    '--font-line-height': 'var(--font-heading-1-line-height)',
    '--font-letter-spacing': 'var(--font-heading-1-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-1-icon-size)',
    '--font-ascender-height': 'var(--font-heading-1-ascender-height)',
    '--font-descender-height': 'var(--font-heading-1-descender-height)',
  }),

  ...responsiveRules('heading-2', {
    '--font-size': 'var(--font-heading-2-size)',
    '--font-line-height': 'var(--font-heading-2-line-height)',
    '--font-letter-spacing': 'var(--font-heading-2-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-2-icon-size)',
    '--font-ascender-height': 'var(--font-heading-2-ascender-height)',
    '--font-descender-height': 'var(--font-heading-2-descender-height)',
  }),

  ...responsiveRules('heading-3', {
    '--font-size': 'var(--font-heading-3-size)',
    '--font-line-height': 'var(--font-heading-3-line-height)',
    '--font-letter-spacing': 'var(--font-heading-3-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-3-icon-size)',
    '--font-ascender-height': 'var(--font-label-3-ascender-height)',
    '--font-descender-height': 'var(--font-label-3-descender-height)',
  }),

  ...responsiveRules('heading-4', {
    '--font-size': 'var(--font-heading-4-size)',
    '--font-line-height': 'var(--font-heading-4-line-height)',
    '--font-letter-spacing': 'var(--font-heading-4-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-4-icon-size)',
    '--font-ascender-height': 'var(--font-heading-4-ascender-height)',
    '--font-descender-height': 'var(--font-heading-4-descender-height)',
  }),

  ...responsiveRules('heading-5', {
    '--font-size': 'var(--font-heading-5-size)',
    '--font-line-height': 'var(--font-heading-5-line-height)',
    '--font-letter-spacing': 'var(--font-heading-5-letter-spacing)',
    '--font-icon-size': 'var(--font-heading-5-icon-size)',
    '--font-ascender-height': 'var(--font-heading-5-ascender-height)',
    '--font-descender-height': 'var(--font-heading-5-descender-height)',
  }),
}
