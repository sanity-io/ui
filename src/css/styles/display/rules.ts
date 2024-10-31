import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const displayRules: Rules = {
  ...responsiveRules('block', {
    '@nest': {
      '&:not([hidden])': {
        display: 'block',
      },
    },
  }),

  ...responsiveRules('inline-block', {
    '@nest': {
      '&:not([hidden])': {
        display: 'inline-block',
      },
    },
  }),

  ...responsiveRules('flex', {
    '@nest': {
      '&:not([hidden])': {
        display: 'flex',
      },
    },
  }),

  ...responsiveRules('inline-flex', {
    '@nest': {
      '&:not([hidden])': {
        display: 'inline-flex',
      },
    },
  }),

  ...responsiveRules('grid', {
    'gridTemplateRows': 'auto',
    '@nest': {
      '&:not([hidden])': {
        display: 'grid',
      },
    },
  }),

  ...responsiveRules('inline-grid', {
    'gridTemplateRows': 'auto',
    '@nest': {
      '&:not([hidden])': {
        display: 'inline-grid',
      },
    },
  }),

  ...responsiveRules('none', {
    '@nest': {
      '&:not([hidden])': {
        display: 'none',
      },
    },
  }),
}
