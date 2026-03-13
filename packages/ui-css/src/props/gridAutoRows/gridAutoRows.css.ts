import {_layers} from '../../layers.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoRows} from './types'

export const options: ResponsiveRuleOptions<GridAutoRows> = {
  auto: _responsiveStyle(_layers.prop, {gridAutoRows: 'auto'}, 'auto'),
  min: _responsiveStyle(_layers.prop, {gridAutoRows: 'min-content'}, 'min'),
  max: _responsiveStyle(_layers.prop, {gridAutoRows: 'max-content'}, 'max'),
  fr: _responsiveStyle(_layers.prop, {gridAutoRows: 'minmax(0, 1fr)'}, 'fr'),
}
