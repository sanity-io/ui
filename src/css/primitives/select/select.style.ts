import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.select': {
    '@nest': {
      '& > select:disabled': {
        opacity: 1,
      },
    },
  },

  '.select-presentation': {
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

export const selectStyle: Style = {layers: {primitive}}
