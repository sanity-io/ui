import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const primitive: StyleRules = {
  '.kbd': {
    'boxShadow': `inset 0 0 0 0.5px ${vars.color.border}`,
    'backgroundColor': vars.color.muted.bg,
    'font': 'inherit',
    'verticalAlign': 'top',

    '@nest': {
      '&:not([hidden])': {
        display: 'inline-block',
      },
    },
  },
}

export const kbdStyle: Style = {layers: {primitive}}
