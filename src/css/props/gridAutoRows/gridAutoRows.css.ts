import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoRows} from './types'

export const options: ResponsiveRuleOptions<GridAutoRows> = {
  auto: _responsiveStyle(layers.props, {
    gridAutoRows: 'auto',
  }),
  min: _responsiveStyle(layers.props, {
    gridAutoRows: 'min-content',
  }),
  max: _responsiveStyle(layers.props, {
    gridAutoRows: 'max-content',
  }),
  fr: _responsiveStyle(layers.props, {
    gridAutoRows: 'minmax(0, 1fr)',
  }),
}
