import {Rules} from '../../types'

export const srOnlyRules: Rules = {
  'sr-only': {
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    overflow: ['hidden', 'clip'],
  },
}
