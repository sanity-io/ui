import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const heightRules: Rules = {
  ...responsiveRules('h-fill', {height: '100%'}),
  ...responsiveRules('h-stretch', {height: 'stretch'}),
}
