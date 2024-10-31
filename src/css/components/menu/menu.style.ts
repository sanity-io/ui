import {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const component: StyleRules = {
  '.menu': {
    outline: 'none',
  },

  '.menu-divider': {
    height: `1px`,
    border: 0,
    backgroundColor: vars.color.border,
    margin: 0,
  },
}

export const menuStyle: Style = {layers: {component}}
