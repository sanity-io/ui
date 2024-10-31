import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const positionRules: Rules = {
  ...responsiveRules('pos-absolute', {
    position: 'absolute',
  }),

  ...responsiveRules('pos-fixed', {
    position: 'fixed',
  }),

  ...responsiveRules('pos-relative', {
    position: 'relative',
  }),

  ...responsiveRules('pos-static', {
    position: 'static',
  }),

  ...responsiveRules('pos-sticky', {
    position: 'sticky',
  }),

  ...responsiveRules('inset-0', {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
}
