import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridAutoFlow} from './types'

export const options: ResponsiveRuleOptions<GridAutoFlow> = {
  'row': _responsiveStyle(layers.props, {
    gridAutoFlow: 'row',
  }),
  'column': _responsiveStyle(layers.props, {
    gridAutoFlow: 'column-content',
  }),
  'row dense': _responsiveStyle(layers.props, {
    gridAutoFlow: 'row dense',
  }),
  'column dense': _responsiveStyle(layers.props, {
    gridAutoFlow: 'column dense',
  }),
}
