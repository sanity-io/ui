import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.stack': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}

export const stackStyle: Style = {
  layers: {
    primitive,
  },
}
