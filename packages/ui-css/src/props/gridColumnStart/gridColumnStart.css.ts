import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridColumnStart} from './types'

export const options: ResponsiveRuleOptions<GridColumnStart> = {
  auto: _responsiveStyle(_layers.prop, {gridColumnStart: 'auto'}, 'auto'),
  1: _responsiveStyle(_layers.prop, {gridColumnStart: '1'}, '1'),
  2: _responsiveStyle(_layers.prop, {gridColumnStart: '2'}, '2'),
  3: _responsiveStyle(_layers.prop, {gridColumnStart: '3'}, '3'),
  4: _responsiveStyle(_layers.prop, {gridColumnStart: '4'}, '4'),
  5: _responsiveStyle(_layers.prop, {gridColumnStart: '5'}, '5'),
  6: _responsiveStyle(_layers.prop, {gridColumnStart: '6'}, '6'),
  7: _responsiveStyle(_layers.prop, {gridColumnStart: '7'}, '7'),
  8: _responsiveStyle(_layers.prop, {gridColumnStart: '8'}, '8'),
  9: _responsiveStyle(_layers.prop, {gridColumnStart: '9'}, '9'),
  10: _responsiveStyle(_layers.prop, {gridColumnStart: '10'}, '10'),
  11: _responsiveStyle(_layers.prop, {gridColumnStart: '11'}, '11'),
  12: _responsiveStyle(_layers.prop, {gridColumnStart: '12'}, '12'),
}
