import {type Shadow} from '@sanity/ui-tokens'
import {SHADOW} from '@sanity/ui-tokens/constants'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

export const options: ResponsiveRuleOptions<Shadow> = {
  ..._fromEntries(
    SHADOW.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          boxShadow: vars.shadow[index],
        },
        String(index),
      ),
    ]),
  ),
}
