import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Outline} from './types'

export const options: ResponsiveRuleOptions<Outline> = {
  none: _responsiveStyle(layers.props, {
    outline: 'none',
  }),
}
