import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {PointerEvents} from './types'

export const options: ResponsiveRuleOptions<PointerEvents> = {
  auto: _responsiveStyle(layers.props, {
    pointerEvents: 'auto',
  }),
  none: _responsiveStyle(layers.props, {
    pointerEvents: 'none',
  }),
}
