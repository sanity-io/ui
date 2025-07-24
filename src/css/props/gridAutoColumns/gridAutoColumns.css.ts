import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoColumns} from './types'

export const options: ResponsiveRuleOptions<GridAutoColumns> = {
  auto: _responsiveStyle(layers.props, {
    gridAutoColumns: 'auto',
  }),
  min: _responsiveStyle(layers.props, {
    gridAutoColumns: 'min-content',
  }),
  max: _responsiveStyle(layers.props, {
    gridAutoColumns: 'max-content',
  }),
  fr: _responsiveStyle(layers.props, {
    gridAutoColumns: 'minmax(0, 1fr)',
  }),
}
