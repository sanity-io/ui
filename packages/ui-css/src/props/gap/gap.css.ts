import {SPACE, type Space} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const gapOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        gap: vars.space[index],
      }),
    ]),
  ),
}

export const gapXOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        columnGap: vars.space[index],
      }),
    ]),
  ),
}

export const gapYOptions: ResponsiveRuleOptions<Space> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        rowGap: vars.space[index],
      }),
    ]),
  ),
}
