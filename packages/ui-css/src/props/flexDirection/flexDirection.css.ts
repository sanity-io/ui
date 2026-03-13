import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {FlexDirection} from './types'

export const options: ResponsiveRuleOptions<FlexDirection> = {
  'row': _responsiveStyle(_layers.prop, {flexDirection: 'row'}, 'row'),
  'row-reverse': _responsiveStyle(_layers.prop, {flexDirection: 'row-reverse'}, 'row-reverse'),
  'column': _responsiveStyle(_layers.prop, {flexDirection: 'column'}, 'column'),
  'column-reverse': _responsiveStyle(
    _layers.prop,
    {flexDirection: 'column-reverse'},
    'column-reverse',
  ),
}
