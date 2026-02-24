import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridColumn} from './types'

export const options: ResponsiveRuleOptions<GridColumn> = {
  auto: _responsiveStyle(layers.props, {
    gridColumn: 'auto',
  }),
  full: _responsiveStyle(layers.props, {
    gridColumn: '1 / -1',
  }),
  1: _responsiveStyle(layers.props, {
    gridColumn: 'span 1 / span 1',
  }),
  2: _responsiveStyle(layers.props, {
    gridColumn: 'span 2 / span 2',
  }),
  3: _responsiveStyle(layers.props, {
    gridColumn: 'span 3 / span 3',
  }),
  4: _responsiveStyle(layers.props, {
    gridColumn: 'span 4 / span 4',
  }),
  5: _responsiveStyle(layers.props, {
    gridColumn: 'span 5 / span 5',
  }),
  6: _responsiveStyle(layers.props, {
    gridColumn: 'span 6 / span 6',
  }),
  7: _responsiveStyle(layers.props, {
    gridColumn: 'span 7 / span 7',
  }),
  8: _responsiveStyle(layers.props, {
    gridColumn: 'span 8 / span 8',
  }),
  9: _responsiveStyle(layers.props, {
    gridColumn: 'span 9 / span 9',
  }),
  10: _responsiveStyle(layers.props, {
    gridColumn: 'span 10 / span 10',
  }),
  11: _responsiveStyle(layers.props, {
    gridColumn: 'span 11 / span 11',
  }),
  12: _responsiveStyle(layers.props, {
    gridColumn: 'span 12 / span 12',
  }),
}
