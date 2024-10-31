import {Style, StyleRules} from '../../types'

const component: StyleRules = {
  '.toast-layer': {
    position: 'fixed',
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    maxWidth: '420px',
    width: '100%',
  },

  '.toast': {
    pointerEvents: 'all',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },
}

export const toastStyle: Style = {layers: {component}}
