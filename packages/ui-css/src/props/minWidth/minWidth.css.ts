import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {MinWidth} from './types'

export const options: ResponsiveRuleOptions<MinWidth> = {
  0: _responsiveStyle(
    _layers.prop,
    {
      minWidth: 0,
    },
    '0',
  ),
  auto: _responsiveStyle(
    _layers.prop,
    {
      minWidth: 'auto',
    },
    'auto',
  ),
  full: _responsiveStyle(
    _layers.prop,
    {
      minWidth: '100%',
    },
    'full',
  ),
  min: _responsiveStyle(
    _layers.prop,
    {
      minWidth: 'min-content',
    },
    'min',
  ),
  max: _responsiveStyle(
    _layers.prop,
    {
      minWidth: 'max-content',
    },
    'max',
  ),
  fit: _responsiveStyle(
    _layers.prop,
    {
      minWidth: 'fit-content',
    },
    'fit',
  ),
}
