import type {Style, StyleRules} from '../../types'

const rules: StyleRules = {
  '.pointer-events-none': {
    pointerEvents: 'none',
  },

  '.pointer-events-auto': {
    pointerEvents: 'auto',
  },
}

export const pointerEventsStyle: Style = {layers: {util: rules}}
