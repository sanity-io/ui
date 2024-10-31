import {vars} from '../../theme'
import type {Style, StyleKeyframes, StyleRules} from '../../types'

const KEYFRAMES_DIALOG_ZOOM_IN = 'dialog-zoom-in'
const KEYFRAMES_DIALOG_FADE_IN = 'dialog-fade-in'

const keyframes: StyleKeyframes = {
  [KEYFRAMES_DIALOG_ZOOM_IN]: {
    from: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  [KEYFRAMES_DIALOG_FADE_IN]: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}

const component: StyleRules = {
  '.dialog': {
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',

    background: vars.color.backdrop,

    nest: {
      '&[data-animate]': {
        animation: `${KEYFRAMES_DIALOG_FADE_IN} 200ms ease-out`,
      },

      '&[data-animate] > [data-ui="DialogCard"]': {
        animation: `${KEYFRAMES_DIALOG_ZOOM_IN} 200ms ease-out`,
      },
    },
  },

  '.dialog-container': {
    width: '100%',
    height: '100%',
  },

  '.dialog-card-root': {
    width: '100%',
    maxHeight: '100%',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },

  '.dialog-layout': {
    width: '100%',
  },

  '.dialog-header': {
    zIndex: 2,
  },

  '.dialog-content': {
    zIndex: 1,
    outline: 'none',
  },

  '.dialog-footer': {
    zIndex: 3,
  },
}

export const dialogStyle: Style = {keyframes, layers: {component}}
