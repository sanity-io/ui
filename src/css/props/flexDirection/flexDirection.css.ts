import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {FlexDirection} from './types'

export const options: ResponsiveRuleOptions<FlexDirection> = {
  'row': _responsiveStyle(layers.props, {
    flexDirection: 'row',
  }),
  'row-reverse': _responsiveStyle(layers.props, {
    flexDirection: 'row-reverse',
  }),
  'column': _responsiveStyle(layers.props, {
    flexDirection: 'column',
  }),
  'column-reverse': _responsiveStyle(layers.props, {
    flexDirection: 'column-reverse',
  }),
}
