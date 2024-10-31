import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.sr-only': {
    display: 'block',
    width: 0,
    height: 0,
    position: 'absolute',
    // @ts-expect-error - TODO: fix this
    overflow: ['hidden', 'clip'],
  },
}

export const srOnlyStyle: Style = {layers: {primitive}}
