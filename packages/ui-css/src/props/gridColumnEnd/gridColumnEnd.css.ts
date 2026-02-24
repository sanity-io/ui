import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridColumnEnd} from './types'

export const options: ResponsiveRuleOptions<GridColumnEnd> = {
  auto: _responsiveStyle(layers.props, {
    gridColumnEnd: 'auto',
  }),
  1: _responsiveStyle(layers.props, {
    gridColumnEnd: '1',
  }),
  2: _responsiveStyle(layers.props, {
    gridColumnEnd: '2',
  }),
  3: _responsiveStyle(layers.props, {
    gridColumnEnd: '3',
  }),
  4: _responsiveStyle(layers.props, {
    gridColumnEnd: '4',
  }),
  5: _responsiveStyle(layers.props, {
    gridColumnEnd: '5',
  }),
  6: _responsiveStyle(layers.props, {
    gridColumnEnd: '6',
  }),
  7: _responsiveStyle(layers.props, {
    gridColumnEnd: '7',
  }),
  8: _responsiveStyle(layers.props, {
    gridColumnEnd: '8',
  }),
  9: _responsiveStyle(layers.props, {
    gridColumnEnd: '9',
  }),
  10: _responsiveStyle(layers.props, {
    gridColumnEnd: '10',
  }),
  11: _responsiveStyle(layers.props, {
    gridColumnEnd: '11',
  }),
  12: _responsiveStyle(layers.props, {
    gridColumnEnd: '12',
  }),
}
