import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Outline} from './types'

export const options: ResponsiveRuleOptions<Outline> = {
  none: _responsiveStyle(
    _layers.prop,
    {
      outline: 'none',
    },
    'none',
  ),
}
