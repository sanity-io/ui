import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {FlexWrap} from './types'

export const options: ResponsiveRuleOptions<FlexWrap> = {
  'wrap': _responsiveStyle(_layers.prop, {flexWrap: 'wrap'}, 'wrap'),
  'wrap-reverse': _responsiveStyle(_layers.prop, {flexWrap: 'wrap-reverse'}, 'wrap-reverse'),
  'nowrap': _responsiveStyle(_layers.prop, {flexWrap: 'nowrap'}, 'nowrap'),
}
