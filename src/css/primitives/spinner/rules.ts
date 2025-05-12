import {Rules} from '../../types'

export const spinnerRules: Rules = {
  'spinner': {},

  'animated-spinner-icon': {
    'animation': 'spinner-rotate 500ms linear infinite',

    // @ts-expect-error - TODO: fix this
    '@keyframes': {
      'spinner-rotate': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
}
