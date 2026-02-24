import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {JustifyContent} from './types'

export const options: ResponsiveRuleOptions<JustifyContent> = {
  'flex-start': _responsiveStyle(_layers.prop, {justifyContent: 'flex-start'}, 'flex-start'),
  'flex-end': _responsiveStyle(_layers.prop, {justifyContent: 'flex-end'}, 'flex-end'),
  'center': _responsiveStyle(_layers.prop, {justifyContent: 'center'}, 'center'),
  'space-between': _responsiveStyle(
    _layers.prop,
    {justifyContent: 'space-between'},
    'space-between',
  ),
  'space-around': _responsiveStyle(_layers.prop, {justifyContent: 'space-around'}, 'space-around'),
  'space-evenly': _responsiveStyle(_layers.prop, {justifyContent: 'space-evenly'}, 'space-evenly'),
}
