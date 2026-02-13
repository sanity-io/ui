import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {MaxWidth} from './types'

export const options: ResponsiveRuleOptions<MaxWidth> = {
  auto: _responsiveStyle(layers.props, {
    maxWidth: 'none',
  }),
  fill: _responsiveStyle(layers.props, {
    maxWidth: '100%',
  }),
  0: _responsiveStyle(layers.props, {
    maxWidth: vars.container[0],
  }),
  1: _responsiveStyle(layers.props, {
    maxWidth: vars.container[1],
  }),
  2: _responsiveStyle(layers.props, {
    maxWidth: vars.container[2],
  }),
  3: _responsiveStyle(layers.props, {
    maxWidth: vars.container[3],
  }),
  4: _responsiveStyle(layers.props, {
    maxWidth: vars.container[4],
  }),
  5: _responsiveStyle(layers.props, {
    maxWidth: vars.container[5],
  }),
}
