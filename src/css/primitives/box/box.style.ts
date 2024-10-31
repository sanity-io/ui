import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.box': {
    nest: {
      'iframe&': {
        border: 'none',
      },

      'ul&, ol&': {
        listStyle: 'none',
      },

      '&.muted': {
        backgroundColor: vars.color.muted.bg,
      },
    },
  },
}

export const boxStyle: Style = {layers: {primitive}}
