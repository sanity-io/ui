import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridRowEnd} from './types'

export const options: ResponsiveRuleOptions<GridRowEnd> = {
  auto: _responsiveStyle(_layers.prop, {gridRowEnd: 'auto'}, 'auto'),
  1: _responsiveStyle(_layers.prop, {gridRowEnd: '1'}, '1'),
  2: _responsiveStyle(_layers.prop, {gridRowEnd: '2'}, '2'),
  3: _responsiveStyle(_layers.prop, {gridRowEnd: '3'}, '3'),
  4: _responsiveStyle(_layers.prop, {gridRowEnd: '4'}, '4'),
  5: _responsiveStyle(_layers.prop, {gridRowEnd: '5'}, '5'),
  6: _responsiveStyle(_layers.prop, {gridRowEnd: '6'}, '6'),
  7: _responsiveStyle(_layers.prop, {gridRowEnd: '7'}, '7'),
  8: _responsiveStyle(_layers.prop, {gridRowEnd: '8'}, '8'),
  9: _responsiveStyle(_layers.prop, {gridRowEnd: '9'}, '9'),
  10: _responsiveStyle(_layers.prop, {gridRowEnd: '10'}, '10'),
  11: _responsiveStyle(_layers.prop, {gridRowEnd: '11'}, '11'),
  12: _responsiveStyle(_layers.prop, {gridRowEnd: '12'}, '12'),
}
