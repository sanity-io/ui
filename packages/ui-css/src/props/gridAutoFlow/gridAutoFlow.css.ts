import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoFlow} from './types'

export const options: ResponsiveRuleOptions<GridAutoFlow> = {
  'row': _responsiveStyle(_layers.prop, {gridAutoFlow: 'row'}, 'row'),
  'column': _responsiveStyle(_layers.prop, {gridAutoFlow: 'column-content'}, 'column'),
  'row dense': _responsiveStyle(_layers.prop, {gridAutoFlow: 'row dense'}, 'row-dense'),
  'column dense': _responsiveStyle(_layers.prop, {gridAutoFlow: 'column dense'}, 'column-dense'),
}
