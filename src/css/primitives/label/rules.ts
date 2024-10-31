import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const labelRules: Rules = {
  'label': {
    '--font-weight-regular': `var(--font-label-weight-regular)`,
    '--font-weight-medium': `var(--font-label-weight-medium)`,
    '--font-weight-semibold': `var(--font-label-weight-semibold)`,
    '--font-weight-bold': `var(--font-label-weight-bold)`,

    '--font-family': `var(--font-label-family)`,

    'color': 'var(--color-fg)',
    'textTransform': 'uppercase',

    '@nest': {
      '& a': {
        color: 'var(--color-link-fg)',
        textDecoration: 'none',
      },
    },
  },

  'label-accent': {
    '--fg-color': 'var(--color-accent-fg)',
  },

  'label-muted': {
    '--fg-color': 'var(--color-muted-fg)',
  },

  ...responsiveRules('label-0', {
    '--font-size': 'var(--font-label-0-size)',
    '--font-line-height': 'var(--font-label-0-line-height)',
    '--font-letter-spacing': 'var(--font-label-0-letter-spacing)',
    '--font-icon-size': 'var(--font-label-0-icon-size)',
    '--font-ascender-height': 'var(--font-label-0-ascender-height)',
    '--font-descender-height': 'var(--font-label-0-descender-height)',
  }),

  ...responsiveRules('label-1', {
    '--font-size': 'var(--font-label-1-size)',
    '--font-line-height': 'var(--font-label-1-line-height)',
    '--font-letter-spacing': 'var(--font-label-1-letter-spacing)',
    '--font-icon-size': 'var(--font-label-1-icon-size)',
    '--font-ascender-height': 'var(--font-label-1-ascender-height)',
    '--font-descender-height': 'var(--font-label-1-descender-height)',
  }),

  ...responsiveRules('label-2', {
    '--font-size': 'var(--font-label-2-size)',
    '--font-line-height': 'var(--font-label-2-line-height)',
    '--font-letter-spacing': 'var(--font-label-2-letter-spacing)',
    '--font-icon-size': 'var(--font-label-2-icon-size)',
    '--font-ascender-height': 'var(--font-label-2-ascender-height)',
    '--font-descender-height': 'var(--font-label-2-descender-height)',
  }),

  ...responsiveRules('label-3', {
    '--font-size': 'var(--font-label-3-size)',
    '--font-line-height': 'var(--font-label-3-line-height)',
    '--font-letter-spacing': 'var(--font-label-3-letter-spacing)',
    '--font-icon-size': 'var(--font-label-3-icon-size)',
    '--font-ascender-height': 'var(--font-label-3-ascender-height)',
    '--font-descender-height': 'var(--font-label-3-descender-height)',
  }),

  ...responsiveRules('label-4', {
    '--font-size': 'var(--font-label-4-size)',
    '--font-line-height': 'var(--font-label-4-line-height)',
    '--font-letter-spacing': 'var(--font-label-4-letter-spacing)',
    '--font-icon-size': 'var(--font-label-4-icon-size)',
    '--font-ascender-height': 'var(--font-label-4-ascender-height)',
    '--font-descender-height': 'var(--font-label-4-descender-height)',
  }),

  ...responsiveRules('label-5', {
    '--font-size': 'var(--font-label-5-size)',
    '--font-line-height': 'var(--font-label-5-line-height)',
    '--font-letter-spacing': 'var(--font-label-5-letter-spacing)',
    '--font-icon-size': 'var(--font-label-5-icon-size)',
    '--font-ascender-height': 'var(--font-label-5-ascender-height)',
    '--font-descender-height': 'var(--font-label-5-descender-height)',
  }),
}
