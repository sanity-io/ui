import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {AlignItems} from './types'

export const options: ResponsiveRuleOptions<AlignItems> = {
  'baseline': _responsiveStyle(layers.props, {
    alignItems: 'baseline',
  }),
  'center': _responsiveStyle(layers.props, {
    alignItems: 'center',
  }),
  'flex-end': _responsiveStyle(layers.props, {
    alignItems: 'flex-end',
  }),
  'flex-start': _responsiveStyle(layers.props, {
    alignItems: 'flex-start',
  }),
  'stretch': _responsiveStyle(layers.props, {
    alignItems: 'stretch',
  }),
}
