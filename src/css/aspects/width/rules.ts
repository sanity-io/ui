import {Rules} from '../../types'

export const widthRules: Rules = {
  'w-fill': {
    // @ts-expect-error - TODO: fix this
    width: ['-moz-available', '-webkit-fill-available', 'stretch'],
  },
}
