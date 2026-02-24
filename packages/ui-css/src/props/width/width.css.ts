import {CONTAINER_SCALE} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {Width} from './types'

export const options: ResponsiveRuleOptions<Width> = {
  auto: _responsiveStyle(layers.props, {
    width: 'auto',
  }),
  fill: _responsiveStyle(layers.props, {
    width: '100%',
  }),
  stretch: _responsiveStyle(layers.props, {
    width: 'stretch',
  }),
  min: _responsiveStyle(layers.props, {
    width: 'min-content',
  }),
  max: _responsiveStyle(layers.props, {
    width: 'max-content',
  }),
  ..._fromEntries(
    CONTAINER_SCALE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        width: vars.container[index],
      }),
    ]),
  ),
}
