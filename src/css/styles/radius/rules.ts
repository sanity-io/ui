import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const radiusRules: Rules = {
  ...responsiveRules('r-0', {borderRadius: 'var(--radius-0)'}),
  ...responsiveRules('r-1', {borderRadius: 'var(--radius-1)'}),
  ...responsiveRules('r-2', {borderRadius: 'var(--radius-2)'}),
  ...responsiveRules('r-3', {borderRadius: 'var(--radius-3)'}),
  ...responsiveRules('r-4', {borderRadius: 'var(--radius-4)'}),
  ...responsiveRules('r-5', {borderRadius: 'var(--radius-5)'}),
  ...responsiveRules('r-6', {borderRadius: 'var(--radius-6)'}),
  ...responsiveRules('r-full', {borderRadius: '9999px'}),
}
