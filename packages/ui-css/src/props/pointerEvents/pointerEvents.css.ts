import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {PointerEvents} from './types'

export const options: ResponsiveRuleOptions<PointerEvents> = {
  auto: _responsiveStyle(_layers.prop, {pointerEvents: 'auto'}, 'auto'),
  none: _responsiveStyle(_layers.prop, {pointerEvents: 'none'}, 'none'),
}
