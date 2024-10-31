import {Rules} from '../../types'

export const toastRules: Rules = {
  'toast-layer': {
    position: 'fixed',
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    maxWidth: '420px',
    width: '100%',
  },

  'toast': {
    pointerEvents: 'all',
    overflow: ['hidden', 'clip'],
  },
}
