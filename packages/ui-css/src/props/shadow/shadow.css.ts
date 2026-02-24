import {SHADOW, type Shadow} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const options: ResponsiveRuleOptions<Shadow> = {
  ..._fromEntries(
    SHADOW.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          boxShadow: vars.shadow[index],
          // boxShadow: [
          //   // `0 0 0 ${vars.shadow.outline} ${vars.color.shadow.outline}`,
          //   `${vars.shadow[index]?.outline} ${vars.color.shadow.outline}`,
          //   `${vars.shadow[index]?.umbra} ${vars.color.shadow.umbra}`,
          //   `${vars.shadow[index]?.penumbra} ${vars.color.shadow.penumbra}`,
          //   `${vars.shadow[index]?.ambient} ${vars.color.shadow.ambient}`,
          // ].join(', '),
        },
        String(index),
      ),
    ]),
  ),
}
