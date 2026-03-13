import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {MinHeight} from './types'

export const options: ResponsiveRuleOptions<MinHeight> = {
  full: _responsiveStyle(
    _layers.prop,
    {
      minHeight: '100%',
    },
    'full',
  ),
  0: _responsiveStyle(
    _layers.prop,
    {
      minHeight: 0,
    },
    '0',
  ),
}
