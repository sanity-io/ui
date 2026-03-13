import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Overflow} from './types'

export const options: ResponsiveRuleOptions<Overflow> = {
  visible: _responsiveStyle(_layers.prop, {overflow: 'visible'}, 'visible'),
  hidden: _responsiveStyle(_layers.prop, {overflow: 'hidden'}, 'hidden'),
  auto: _responsiveStyle(_layers.prop, {overflow: 'auto'}, 'auto'),
}
