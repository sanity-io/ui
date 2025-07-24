import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridTemplateRows} from './types'

export const options: ResponsiveRuleOptions<GridTemplateRows> = {
  1: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(1, 1fr)',
  }),
  2: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(2, 1fr)',
  }),
  3: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(3, 1fr)',
  }),
  4: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(4, 1fr)',
  }),
  5: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(5, 1fr)',
  }),
  6: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(6, 1fr)',
  }),
  7: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(7, 1fr)',
  }),
  8: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(8, 1fr)',
  }),
  9: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(9, 1fr)',
  }),
  10: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(10, 1fr)',
  }),
  11: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(11, 1fr)',
  }),
  12: _responsiveStyle(layers.props, {
    gridTemplateRows: 'repeat(12, 1fr)',
  }),
}
