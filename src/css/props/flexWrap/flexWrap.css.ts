import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {FlexWrap} from './types'

export const options: ResponsiveRuleOptions<FlexWrap> = {
  'wrap': _responsiveStyle(layers.props, {
    flexWrap: 'wrap',
  }),
  'wrap-reverse': _responsiveStyle(layers.props, {
    flexWrap: 'wrap-reverse',
  }),
  'nowrap': _responsiveStyle(layers.props, {
    flexWrap: 'nowrap',
  }),
}
