import {RADIUS, type Radius} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const options: ResponsiveRuleOptions<Radius | 'full'> = {
  full: _responsiveStyle(layers.props, {
    borderRadius: '9999px',
  }),
  ..._fromEntries(
    RADIUS.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        borderRadius: vars.radius[index],
      }),
    ]),
  ),
}
