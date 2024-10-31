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
}
