import {Rules} from '../../types'
import {vars} from '../../vars'

export const dialogRules: Rules = {
  'dialog': {
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'alignItems': 'center',
    'justifyContent': 'center',
    'outline': 'none',

    'background': vars.color.backdrop,

    // @ts-expect-error - TODO: fix this
    '@keyframes': {
      'dialog-zoom-in': {
        from: {
          opacity: 0,
          transform: 'scale(0.95)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
      'dialog-fade-in': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },

    '@nest': {
      '&[data-animate]': {
        animation: 'dialog-fade-in 200ms ease-out',
      },

      // Animates the dialog card.
      '&[data-animate] > [data-ui="DialogCard"]': {
        animation: 'dialog-zoom-in 200ms ease-out',
      },
    },
  },

  'dialog-container': {
    width: '100%',
    height: '100%',
  },

  'dialog-card-root': {
    width: '100%',
    maxHeight: '100%',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },

  'dialog-layout': {
    width: '100%',
  },

  'dialog-header': {
    zIndex: 2,
  },

  'dialog-content': {
    zIndex: 1,
    outline: 'none',
  },

  'dialog-footer': {
    zIndex: 3,
  },
}
