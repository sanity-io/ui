import {defineProperties} from '@vanilla-extract/sprinkles'

import {_responsiveStyle} from '../../_responsiveStyle.css'
import {breakpointsConditions, breakpointsResponsiveArray} from '../../constants'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Flex} from './types'

export const options: ResponsiveRuleOptions<Flex> = {
  none: _responsiveStyle(layers.props, {
    flex: 'none',
  }),
  1: _responsiveStyle(layers.props, {
    flex: 1,
  }),
  2: _responsiveStyle(layers.props, {
    flex: 2,
  }),
  3: _responsiveStyle(layers.props, {
    flex: 3,
  }),
  4: _responsiveStyle(layers.props, {
    flex: 4,
  }),
  5: _responsiveStyle(layers.props, {
    flex: 5,
  }),
  6: _responsiveStyle(layers.props, {
    flex: 6,
  }),
  7: _responsiveStyle(layers.props, {
    flex: 7,
  }),
  8: _responsiveStyle(layers.props, {
    flex: 8,
  }),
  9: _responsiveStyle(layers.props, {
    flex: 9,
  }),
  10: _responsiveStyle(layers.props, {
    flex: 10,
  }),
  11: _responsiveStyle(layers.props, {
    flex: 11,
  }),
  12: _responsiveStyle(layers.props, {
    flex: 12,
  }),
  auto: _responsiveStyle(layers.props, {
    flex: 'auto',
  }),
  initial: _responsiveStyle(layers.props, {
    flex: 'initial',
  }),
}

export const flexProperties = defineProperties({
  '@layer': layers.props,
  'conditions': breakpointsConditions,
  'defaultCondition': '0',
  'responsiveArray': breakpointsResponsiveArray,
  'properties': {
    flex: ['none', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'initial'],
  },
})
