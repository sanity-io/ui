import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {AlignItems} from './types'

export const options: ResponsiveRuleOptions<AlignItems> = {
  'baseline': _responsiveStyle(_layers.prop, {alignItems: 'baseline'}, 'baseline'),
  'center': _responsiveStyle(_layers.prop, {alignItems: 'center'}, 'center'),
  'flex-end': _responsiveStyle(_layers.prop, {alignItems: 'flex-end'}, 'flex-end'),
  'flex-start': _responsiveStyle(_layers.prop, {alignItems: 'flex-start'}, 'flex-start'),
  'stretch': _responsiveStyle(_layers.prop, {alignItems: 'stretch'}, 'stretch'),
}
