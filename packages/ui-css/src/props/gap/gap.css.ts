import {SPACE, type Space} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const gapOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          gap: vars.space[index],
        },
        `${index}`,
      ),
    ]),
  ),
}

export const gapXOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          columnGap: vars.space[index],
        },
        `x-${index}`,
      ),
    ]),
  ),
}

export const gapYOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          rowGap: vars.space[index],
        },
        `y-${index}`,
      ),
    ]),
  ),
}
