import type {Space} from '@sanity/ui-tokens'
import {SPACE} from '@sanity/ui-tokens/constants'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

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
