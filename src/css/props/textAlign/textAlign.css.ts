import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {TextAlign} from './types'

export const options: ResponsiveRuleOptions<TextAlign> = {
  left: _responsiveStyle(layers.props, {
    textAlign: 'left',
  }),
  right: _responsiveStyle(layers.props, {
    textAlign: 'right',
  }),
  center: _responsiveStyle(layers.props, {
    textAlign: 'center',
  }),
  justify: _responsiveStyle(layers.props, {
    textAlign: 'justify',
  }),
  initial: _responsiveStyle(layers.props, {
    textAlign: 'initial',
  }),
}
