import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.container': {
    margin: '0 auto',
    width: '100%',
  },
}

export const containerStyle: Style = {layers: {primitive}}
