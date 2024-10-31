import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.tooltip': {
    pointerEvents: 'none',
  },
}

export const tooltipStyle: Style = {layers: {primitive}}
