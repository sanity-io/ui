import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Overflow} from './types'

export const options: ResponsiveRuleOptions<Overflow> = {
  visible: _responsiveStyle(layers.props, {
    overflow: 'visible',
  }),
  hidden: _responsiveStyle(layers.props, {
    overflow: 'hidden',
  }),
  auto: _responsiveStyle(layers.props, {
    overflow: 'auto',
  }),
}
