import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {TextOverflow} from './types'

export const options: ResponsiveRuleOptions<TextOverflow> = {
  clip: _responsiveStyle(
    _layers.prop,
    {
      display: 'block',
      overflow: 'clip',
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
    },
    'clip',
  ),
  ellipsis: _responsiveStyle(
    _layers.prop,
    {
      display: 'block',
      overflow: 'clip',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    'ellipsis',
  ),
}
