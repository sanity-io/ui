import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {MinHeight} from './types'

export const options: ResponsiveRuleOptions<MinHeight> = {
  full: _responsiveStyle(layers.props, {
    minHeight: '100%',
  }),
  0: _responsiveStyle(layers.props, {
    minHeight: 0,
  }),
}
