import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoColumns} from './types'

export const options: ResponsiveRuleOptions<GridAutoColumns> = {
  auto: _responsiveStyle(_layers.prop, {gridAutoColumns: 'auto'}, 'auto'),
  min: _responsiveStyle(_layers.prop, {gridAutoColumns: 'min-content'}, 'min'),
  max: _responsiveStyle(_layers.prop, {gridAutoColumns: 'max-content'}, 'max'),
  fr: _responsiveStyle(_layers.prop, {gridAutoColumns: 'minmax(0, 1fr)'}, 'fr'),
}
