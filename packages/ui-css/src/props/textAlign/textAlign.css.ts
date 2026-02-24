import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {TextAlign} from './types'

export const options: ResponsiveRuleOptions<TextAlign> = {
  left: _responsiveStyle(_layers.prop, {textAlign: 'left'}, 'left'),
  right: _responsiveStyle(_layers.prop, {textAlign: 'right'}, 'right'),
  center: _responsiveStyle(_layers.prop, {textAlign: 'center'}, 'center'),
  justify: _responsiveStyle(_layers.prop, {textAlign: 'justify'}, 'justify'),
  // initial: _responsiveStyle(layers.prop, {textAlign: 'initial'}, 'initial'),
}
