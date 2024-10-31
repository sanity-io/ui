import type {Style, StyleRules} from '../../types'

const rules: StyleRules = {
  '.outline-none': {
    outline: 'none',
  },
}

export const outlineStyle: Style = {layers: {util: rules}}
