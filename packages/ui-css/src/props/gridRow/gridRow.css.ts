import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridRow} from './types'

export const options: ResponsiveRuleOptions<GridRow> = {
  auto: _responsiveStyle(_layers.prop, {gridRow: 'auto'}, 'auto'),
  full: _responsiveStyle(_layers.prop, {gridRow: '1 / -1'}, 'full'),
  1: _responsiveStyle(_layers.prop, {gridRow: 'span 1 / span 1'}, '1'),
  2: _responsiveStyle(_layers.prop, {gridRow: 'span 2 / span 2'}, '2'),
  3: _responsiveStyle(_layers.prop, {gridRow: 'span 3 / span 3'}, '3'),
  4: _responsiveStyle(_layers.prop, {gridRow: 'span 4 / span 4'}, '4'),
  5: _responsiveStyle(_layers.prop, {gridRow: 'span 5 / span 5'}, '5'),
  6: _responsiveStyle(_layers.prop, {gridRow: 'span 6 / span 6'}, '6'),
  7: _responsiveStyle(_layers.prop, {gridRow: 'span 7 / span 7'}, '7'),
  8: _responsiveStyle(_layers.prop, {gridRow: 'span 8 / span 8'}, '8'),
  9: _responsiveStyle(_layers.prop, {gridRow: 'span 9 / span 9'}, '9'),
  10: _responsiveStyle(_layers.prop, {gridRow: 'span 10 / span 10'}, '10'),
  11: _responsiveStyle(_layers.prop, {gridRow: 'span 11 / span 11'}, '11'),
  12: _responsiveStyle(_layers.prop, {gridRow: 'span 12 / span 12'}, '12'),
}
