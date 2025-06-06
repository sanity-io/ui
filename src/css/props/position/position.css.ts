import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Position} from './types'

export const options: ResponsiveRuleOptions<Position> = {
  absolute: _responsiveStyle(layers.props, {
    position: 'absolute',
  }),
  fixed: _responsiveStyle(layers.props, {
    position: 'fixed',
  }),
  relative: _responsiveStyle(layers.props, {
    position: 'relative',
  }),
  static: _responsiveStyle(layers.props, {
    position: 'static',
  }),
  sticky: _responsiveStyle(layers.props, {
    position: 'sticky',
  }),
}
