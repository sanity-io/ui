import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {TextOverflow} from './types'

export const options: ResponsiveRuleOptions<TextOverflow> = {
  clip: _responsiveStyle(layers.props, {
    display: 'block',
    overflow: 'clip',
    textOverflow: 'clip',
    whiteSpace: 'nowrap',
  }),
  ellipsis: _responsiveStyle(layers.props, {
    display: 'block',
    overflow: 'clip',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
}
