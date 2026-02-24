import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
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
