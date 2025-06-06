import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Height} from './types'

export const options: ResponsiveRuleOptions<Height> = {
  fill: _responsiveStyle(layers.props, {
    height: '100%',
  }),
  auto: _responsiveStyle(layers.props, {
    height: 'auto',
  }),
  min: _responsiveStyle(layers.props, {
    height: 'min-content',
  }),
  max: _responsiveStyle(layers.props, {
    height: 'max-content',
  }),
  fit: _responsiveStyle(layers.props, {
    height: 'fit-content',
  }),
  stretch: _responsiveStyle(layers.props, {
    height: 'stretch',
  }),
}
