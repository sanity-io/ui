import {RADIUS, type Radius} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
// import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../system/_contants'
import type {ResponsiveRuleOptions, ResponsiveRules} from '../../types'
import {vars} from '../../vars.css'

export const options: ResponsiveRuleOptions<Radius> = {
  ..._fromEntries(
    RADIUS.map((key): [Radius, ResponsiveRules] => {
      if (key === 'full') {
        return [
          key,
          _responsiveStyle(
            _layers.prop,
            {
              borderRadius: vars.radius[key],
            },
            key,
          ),
        ]
      }

      return [
        key,
        _responsiveStyle(
          _layers.prop,
          {
            'borderRadius': vars.radius[key],

            '@supports': {
              ['(corner-shape: squircle)']: {
                borderRadius: `calc(${vars.radius[key]} * ${vars.corner.shape.squircle} * ${_CORNER_SHAPE_RADIUS_MULTIPLIER})`,
                // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
                cornerShape: `superellipse(${vars.corner.shape.squircle})`,
              },
            },
          },
          String(key),
        ),
      ]
    }),
  ),
}
