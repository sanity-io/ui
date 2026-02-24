import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Height} from './types'

export const options: ResponsiveRuleOptions<Height> = {
  fill: _responsiveStyle(_layers.prop, {height: '100%'}, 'fill'),
  auto: _responsiveStyle(_layers.prop, {height: 'auto'}, 'auto'),
  min: _responsiveStyle(_layers.prop, {height: 'min-content'}, 'min'),
  max: _responsiveStyle(_layers.prop, {height: 'max-content'}, 'max'),
  fit: _responsiveStyle(_layers.prop, {height: 'fit-content'}, 'fit'),
  stretch: _responsiveStyle(_layers.prop, {height: 'stretch'}, 'stretch'),
}
