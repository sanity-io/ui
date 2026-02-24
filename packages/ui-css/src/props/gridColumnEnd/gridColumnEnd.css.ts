import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridColumnEnd} from './types'

export const options: ResponsiveRuleOptions<GridColumnEnd> = {
  auto: _responsiveStyle(_layers.prop, {gridColumnEnd: 'auto'}, 'auto'),
  1: _responsiveStyle(_layers.prop, {gridColumnEnd: '1'}, '1'),
  2: _responsiveStyle(_layers.prop, {gridColumnEnd: '2'}, '2'),
  3: _responsiveStyle(_layers.prop, {gridColumnEnd: '3'}, '3'),
  4: _responsiveStyle(_layers.prop, {gridColumnEnd: '4'}, '4'),
  5: _responsiveStyle(_layers.prop, {gridColumnEnd: '5'}, '5'),
  6: _responsiveStyle(_layers.prop, {gridColumnEnd: '6'}, '6'),
  7: _responsiveStyle(_layers.prop, {gridColumnEnd: '7'}, '7'),
  8: _responsiveStyle(_layers.prop, {gridColumnEnd: '8'}, '8'),
  9: _responsiveStyle(_layers.prop, {gridColumnEnd: '9'}, '9'),
  10: _responsiveStyle(_layers.prop, {gridColumnEnd: '10'}, '10'),
  11: _responsiveStyle(_layers.prop, {gridColumnEnd: '11'}, '11'),
  12: _responsiveStyle(_layers.prop, {gridColumnEnd: '12'}, '12'),
}
