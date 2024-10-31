import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const insetRules: Rules = {
  ...responsiveRules('inset-0', {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),

  ...responsiveRules('top-0', {top: 0}),
  ...responsiveRules('right-0', {right: 0}),
  ...responsiveRules('bottom-0', {bottom: 0}),
  ...responsiveRules('left-0', {left: 0}),
}
