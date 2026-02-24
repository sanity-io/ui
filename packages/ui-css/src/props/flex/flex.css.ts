import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {FlexValue} from './types'

export const options: ResponsiveRuleOptions<FlexValue> = {
  none: _responsiveStyle(_layers.prop, {flex: 'none'}, 'none'),
  1: _responsiveStyle(_layers.prop, {flex: 1}, '1'),
  2: _responsiveStyle(_layers.prop, {flex: 2}, '2'),
  3: _responsiveStyle(_layers.prop, {flex: 3}, '3'),
  4: _responsiveStyle(_layers.prop, {flex: 4}, '4'),
  5: _responsiveStyle(_layers.prop, {flex: 5}, '5'),
  6: _responsiveStyle(_layers.prop, {flex: 6}, '6'),
  7: _responsiveStyle(_layers.prop, {flex: 7}, '7'),
  8: _responsiveStyle(_layers.prop, {flex: 8}, '8'),
  9: _responsiveStyle(_layers.prop, {flex: 9}, '9'),
  10: _responsiveStyle(_layers.prop, {flex: 10}, '10'),
  11: _responsiveStyle(_layers.prop, {flex: 11}, '11'),
  12: _responsiveStyle(_layers.prop, {flex: 12}, '12'),
  auto: _responsiveStyle(_layers.prop, {flex: 'auto'}, 'auto'),
  initial: _responsiveStyle(_layers.prop, {flex: 'initial'}, 'initial'),
}
