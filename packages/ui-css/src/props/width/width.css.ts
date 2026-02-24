import {CONTAINER_SCALE} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {Width} from './types'

export const options: ResponsiveRuleOptions<Width> = {
  auto: _responsiveStyle(_layers.prop, {width: 'auto'}, 'auto'),
  fill: _responsiveStyle(_layers.prop, {width: '100%'}, 'fill'),
  stretch: _responsiveStyle(_layers.prop, {width: 'stretch'}, 'stretch'),
  min: _responsiveStyle(_layers.prop, {width: 'min-content'}, 'min'),
  max: _responsiveStyle(_layers.prop, {width: 'max-content'}, 'max'),
  ..._fromEntries(
    CONTAINER_SCALE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {width: vars.container[index]}, String(index)),
    ]),
  ),
}
