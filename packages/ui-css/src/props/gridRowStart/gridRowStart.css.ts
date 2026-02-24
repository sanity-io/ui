import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {GridRowStart} from './types'

export const options: ResponsiveRuleOptions<GridRowStart> = {
  auto: _responsiveStyle(layers.props, {
    gridRowStart: 'auto',
  }),
  1: _responsiveStyle(layers.props, {
    gridRowStart: '1',
  }),
  2: _responsiveStyle(layers.props, {
    gridRowStart: '2',
  }),
  3: _responsiveStyle(layers.props, {
    gridRowStart: '3',
  }),
  4: _responsiveStyle(layers.props, {
    gridRowStart: '4',
  }),
  5: _responsiveStyle(layers.props, {
    gridRowStart: '5',
  }),
  6: _responsiveStyle(layers.props, {
    gridRowStart: '6',
  }),
  7: _responsiveStyle(layers.props, {
    gridRowStart: '7',
  }),
  8: _responsiveStyle(layers.props, {
    gridRowStart: '8',
  }),
  9: _responsiveStyle(layers.props, {
    gridRowStart: '9',
  }),
  10: _responsiveStyle(layers.props, {
    gridRowStart: '10',
  }),
  11: _responsiveStyle(layers.props, {
    gridRowStart: '11',
  }),
  12: _responsiveStyle(layers.props, {
    gridRowStart: '12',
  }),
}
