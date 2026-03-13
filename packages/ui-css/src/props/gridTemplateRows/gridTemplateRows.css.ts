import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridTemplateRows} from './types'

export const options: ResponsiveRuleOptions<GridTemplateRows> = {
  1: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(1, 1fr)',
    },
    '1',
  ),
  2: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(2, 1fr)',
    },
    '2',
  ),
  3: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(3, 1fr)',
    },
    '3',
  ),
  4: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(4, 1fr)',
    },
    '4',
  ),
  5: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(5, 1fr)',
    },
    '5',
  ),
  6: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(6, 1fr)',
    },
    '6',
  ),
  7: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(7, 1fr)',
    },
    '7',
  ),
  8: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(8, 1fr)',
    },
    '8',
  ),
  9: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(9, 1fr)',
    },
    '9',
  ),
  10: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(10, 1fr)',
    },
    '10',
  ),
  11: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(11, 1fr)',
    },
    '11',
  ),
  12: _responsiveStyle(
    _layers.prop,
    {
      gridTemplateRows: 'repeat(12, 1fr)',
    },
    '12',
  ),
}
