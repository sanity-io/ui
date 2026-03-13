import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Position} from './types'

export const options: ResponsiveRuleOptions<Position> = {
  absolute: _responsiveStyle(_layers.prop, {position: 'absolute'}, 'absolute'),
  fixed: _responsiveStyle(_layers.prop, {position: 'fixed'}, 'fixed'),
  relative: _responsiveStyle(_layers.prop, {position: 'relative'}, 'relative'),
  static: _responsiveStyle(_layers.prop, {position: 'static'}, 'static'),
  sticky: _responsiveStyle(_layers.prop, {position: 'sticky'}, 'sticky'),
}
