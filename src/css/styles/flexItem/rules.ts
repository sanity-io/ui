import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const flexItemRules: Rules = {
  ...responsiveRules('flex-none', {flex: 'none'}),
  ...responsiveRules('flex-auto', {flex: 'auto'}),
  ...responsiveRules('flex-1', {flex: 1}),
  ...responsiveRules('flex-2', {flex: 2}),
  ...responsiveRules('flex-3', {flex: 3}),
  ...responsiveRules('flex-4', {flex: 4}),
  ...responsiveRules('flex-5', {flex: 5}),
}
