import type {Style, StyleRules} from '../../types'

const rules: StyleRules = {
  '.text-overflow-ellipsis': {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },

  '.text-overflow-clip': {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },
}

export const textOverflowStyle: Style = {layers: {util: rules}}
