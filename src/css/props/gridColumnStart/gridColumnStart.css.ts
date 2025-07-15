import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridColumnStart} from './types'

export const options: ResponsiveRuleOptions<GridColumnStart> = {
  auto: _responsiveStyle(layers.props, {
    gridColumnStart: 'auto',
  }),
  1: _responsiveStyle(layers.props, {
    gridColumnStart: '1',
  }),
  2: _responsiveStyle(layers.props, {
    gridColumnStart: '2',
  }),
  3: _responsiveStyle(layers.props, {
    gridColumnStart: '3',
  }),
  4: _responsiveStyle(layers.props, {
    gridColumnStart: '4',
  }),
  5: _responsiveStyle(layers.props, {
    gridColumnStart: '5',
  }),
  6: _responsiveStyle(layers.props, {
    gridColumnStart: '6',
  }),
  7: _responsiveStyle(layers.props, {
    gridColumnStart: '7',
  }),
  8: _responsiveStyle(layers.props, {
    gridColumnStart: '8',
  }),
  9: _responsiveStyle(layers.props, {
    gridColumnStart: '9',
  }),
  10: _responsiveStyle(layers.props, {
    gridColumnStart: '10',
  }),
  11: _responsiveStyle(layers.props, {
    gridColumnStart: '11',
  }),
  12: _responsiveStyle(layers.props, {
    gridColumnStart: '12',
  }),
}
