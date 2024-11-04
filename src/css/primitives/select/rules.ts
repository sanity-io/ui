import {Rules} from '../../types'

export const selectRules: Rules = {
  'select': {
    '@nest': {
      '& > select:disabled': {
        opacity: 1,
      },
    },
  },

  'select-presentation': {
    '@nest': {
      '& > span': {
        // place icon to the right
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
}
