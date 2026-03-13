import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridRowStart} from './types'

export const options: ResponsiveRuleOptions<GridRowStart> = {
  auto: _responsiveStyle(_layers.prop, {gridRowStart: 'auto'}, 'auto'),
  1: _responsiveStyle(_layers.prop, {gridRowStart: '1'}, '1'),
  2: _responsiveStyle(_layers.prop, {gridRowStart: '2'}, '2'),
  3: _responsiveStyle(_layers.prop, {gridRowStart: '3'}, '3'),
  4: _responsiveStyle(_layers.prop, {gridRowStart: '4'}, '4'),
  5: _responsiveStyle(_layers.prop, {gridRowStart: '5'}, '5'),
  6: _responsiveStyle(_layers.prop, {gridRowStart: '6'}, '6'),
  7: _responsiveStyle(_layers.prop, {gridRowStart: '7'}, '7'),
  8: _responsiveStyle(_layers.prop, {gridRowStart: '8'}, '8'),
  9: _responsiveStyle(_layers.prop, {gridRowStart: '9'}, '9'),
  10: _responsiveStyle(_layers.prop, {gridRowStart: '10'}, '10'),
  11: _responsiveStyle(_layers.prop, {gridRowStart: '11'}, '11'),
  12: _responsiveStyle(_layers.prop, {gridRowStart: '12'}, '12'),
}
