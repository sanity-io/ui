import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const borderRules: Rules = {
  ...responsiveRules('border', {
    border: '1px solid var(--card-border-color)',
  }),

  ...responsiveRules('border-t', {
    borderTop: '1px solid var(--card-border-color)',
  }),

  ...responsiveRules('border-r', {
    borderRight: '1px solid var(--card-border-color)',
  }),

  ...responsiveRules('border-b', {
    borderBottom: '1px solid var(--card-border-color)',
  }),

  ...responsiveRules('border-l', {
    borderLeft: '1px solid var(--card-border-color)',
  }),
}
