import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'
import type {MaxWidth} from './types'

export const options: ResponsiveRuleOptions<MaxWidth> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: 'none',
    },
    'auto',
  ),
  fill: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: '100%',
    },
    'fill',
  ),
  0: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[0],
    },
    '0',
  ),
  1: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[1],
    },
    '1',
  ),
  2: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[2],
    },
    '2',
  ),
  3: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[3],
    },
    '3',
  ),
  4: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[4],
    },
    '4',
  ),
  5: _responsiveStyle(
    _layers.prop,
    {
      maxWidth: vars.container[5],
    },
    '5',
  ),
}
