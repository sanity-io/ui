import {Style, StyleKeyframes, StyleRules} from '../../types'

const keyframes: StyleKeyframes = {
  'spinner-rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
}

const primitive: StyleRules = {
  '.spinner': {},

  '.animated-spinner-icon': {
    animation: 'spinner-rotate 500ms linear infinite',
  },
}

export const spinnerStyle: Style = {keyframes, layers: {primitive}}
