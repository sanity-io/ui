import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridRowEnd} from './types'

export const options: ResponsiveRuleOptions<GridRowEnd> = {
  auto: _responsiveStyle(layers.props, {
    gridRowEnd: 'auto',
  }),
  1: _responsiveStyle(layers.props, {
    gridRowEnd: '1',
  }),
  2: _responsiveStyle(layers.props, {
    gridRowEnd: '2',
  }),
  3: _responsiveStyle(layers.props, {
    gridRowEnd: '3',
  }),
  4: _responsiveStyle(layers.props, {
    gridRowEnd: '4',
  }),
  5: _responsiveStyle(layers.props, {
    gridRowEnd: '5',
  }),
  6: _responsiveStyle(layers.props, {
    gridRowEnd: '6',
  }),
  7: _responsiveStyle(layers.props, {
    gridRowEnd: '7',
  }),
  8: _responsiveStyle(layers.props, {
    gridRowEnd: '8',
  }),
  9: _responsiveStyle(layers.props, {
    gridRowEnd: '9',
  }),
  10: _responsiveStyle(layers.props, {
    gridRowEnd: '10',
  }),
  11: _responsiveStyle(layers.props, {
    gridRowEnd: '11',
  }),
  12: _responsiveStyle(layers.props, {
    gridRowEnd: '12',
  }),
}
