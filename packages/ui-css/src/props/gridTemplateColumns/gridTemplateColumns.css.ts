import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridTemplateColumns} from './types'

export const options: ResponsiveRuleOptions<GridTemplateColumns> = {
  1: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(1, 1fr)',
  }),
  2: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(2, 1fr)',
  }),
  3: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(3, 1fr)',
  }),
  4: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(4, 1fr)',
  }),
  5: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(5, 1fr)',
  }),
  6: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(6, 1fr)',
  }),
  7: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(7, 1fr)',
  }),
  8: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(8, 1fr)',
  }),
  9: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(9, 1fr)',
  }),
  10: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(10, 1fr)',
  }),
  11: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(11, 1fr)',
  }),
  12: _responsiveStyle(layers.props, {
    gridTemplateColumns: 'repeat(12, 1fr)',
  }),
}
