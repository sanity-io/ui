import {Rules} from '../../types'

export const textOverflowRules: Rules = {
  'text-overflow-ellipsis': {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: ['hidden', 'clip'],
  },

  'text-overflow-clip': {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: ['hidden', 'clip'],
  },
}
