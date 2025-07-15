import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {MinWidth} from './types'

export const options: ResponsiveRuleOptions<MinWidth> = {
  0: _responsiveStyle(layers.props, {
    minWidth: 0,
  }),
  auto: _responsiveStyle(layers.props, {
    minWidth: 'auto',
  }),
  full: _responsiveStyle(layers.props, {
    minWidth: '100%',
  }),
  min: _responsiveStyle(layers.props, {
    minWidth: 'min-content',
  }),
  max: _responsiveStyle(layers.props, {
    minWidth: 'max-content',
  }),
  fit: _responsiveStyle(layers.props, {
    minWidth: 'fit-content',
  }),
}
