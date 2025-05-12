import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.box': {
    'minWidth': 0,
    'minHeight': 0,

    '@nest': {
      '&:is(ul), &:is(ol)': {
        listStyle: 'none',
      },

      '&.muted': {
        backgroundColor: vars.color.muted.bg,
      },
    },
  },

  // sizing

  '.box-content': {
    boxSizing: 'content-box',
  },

  '.box-border': {
    boxSizing: 'border-box',
  },
}

export const boxStyle: Style = {layers: {primitive}}
