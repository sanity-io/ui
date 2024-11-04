import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const textRules: Rules = {
  'text': {
    '--font-weight-regular': `var(--font-text-weight-regular)`,
    '--font-weight-medium': `var(--font-text-weight-medium)`,
    '--font-weight-semibold': `var(--font-text-weight-semibold)`,
    '--font-weight-bold': `var(--font-text-weight-bold)`,

    '--font-family': `var(--font-text-family)`,

    'color': 'var(--color-fg-1)',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  'text-accent': {
    '--fg-color': 'var(--color-accent-fg)',
  },

  'text-muted': {
    '--fg-color': 'var(--color-fg-4)',
  },

  ...responsiveRules('text-0', {
    '--font-size': 'var(--font-text-0-size)',
    '--font-line-height': 'var(--font-text-0-line-height)',
    '--font-letter-spacing': 'var(--font-text-0-letter-spacing)',
    '--font-icon-size': 'var(--font-text-0-icon-size)',
    '--font-ascender-height': 'var(--font-text-0-ascender-height)',
    '--font-descender-height': 'var(--font-text-0-descender-height)',
  }),

  ...responsiveRules('text-1', {
    '--font-size': 'var(--font-text-1-size)',
    '--font-line-height': 'var(--font-text-1-line-height)',
    '--font-letter-spacing': 'var(--font-text-1-letter-spacing)',
    '--font-icon-size': 'var(--font-text-1-icon-size)',
    '--font-ascender-height': 'var(--font-text-1-ascender-height)',
    '--font-descender-height': 'var(--font-text-1-descender-height)',
  }),

  ...responsiveRules('text-2', {
    '--font-size': 'var(--font-text-2-size)',
    '--font-line-height': 'var(--font-text-2-line-height)',
    '--font-letter-spacing': 'var(--font-text-2-letter-spacing)',
    '--font-icon-size': 'var(--font-text-2-icon-size)',
    '--font-ascender-height': 'var(--font-text-2-ascender-height)',
    '--font-descender-height': 'var(--font-text-2-descender-height)',
  }),

  ...responsiveRules('text-3', {
    '--font-size': 'var(--font-text-3-size)',
    '--font-line-height': 'var(--font-text-3-line-height)',
    '--font-letter-spacing': 'var(--font-text-3-letter-spacing)',
    '--font-icon-size': 'var(--font-text-3-icon-size)',
    '--font-ascender-height': 'var(--font-text-3-ascender-height)',
    '--font-descender-height': 'var(--font-text-3-descender-height)',
  }),

  ...responsiveRules('text-4', {
    '--font-size': 'var(--font-text-4-size)',
    '--font-line-height': 'var(--font-text-4-line-height)',
    '--font-letter-spacing': 'var(--font-text-4-letter-spacing)',
    '--font-icon-size': 'var(--font-text-4-icon-size)',
    '--font-ascender-height': 'var(--font-text-4-ascender-height)',
    '--font-descender-height': 'var(--font-text-4-descender-height)',
  }),
}
