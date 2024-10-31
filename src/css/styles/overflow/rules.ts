import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const overflowRules: Rules = {
  ...responsiveRules('overflow-visible', {overflow: 'visible'}),
  ...responsiveRules('overflow-hidden', {overflow: 'hidden'}),
  ...responsiveRules('overflow-scroll', {overflow: 'scroll'}),
  ...responsiveRules('overflow-auto', {overflow: 'auto'}),
}
