import {SHADOW, type Shadow} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const options: ResponsiveRuleOptions<Shadow> = {
  ..._fromEntries(
    SHADOW.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        boxShadow: [
          `0 0 0 ${vars.card.shadow.outline} ${vars.color.shadow.outline}`,
          `${vars.shadow[index].umbra} ${vars.color.shadow.umbra}`,
          `${vars.shadow[index].penumbra} ${vars.color.shadow.penumbra}`,
          `${vars.shadow[index].ambient} ${vars.color.shadow.ambient}`,
        ].join(', '),
      }),
    ]),
  ),
}
