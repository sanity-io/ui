import {SPACE} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {Padding} from './types'

export const paddingOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        padding: vars.space[index],
      }),
    ]),
  ),
}

export const paddingXOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingLeft: vars.space[index],
        paddingRight: vars.space[index],
      }),
    ]),
  ),
}

export const paddingYOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingTop: vars.space[index],
        paddingBottom: vars.space[index],
      }),
    ]),
  ),
}

export const paddingTopOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingTop: vars.space[index],
      }),
    ]),
  ),
}

export const paddingRightOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingRight: vars.space[index],
      }),
    ]),
  ),
}

export const paddingBottomOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingBottom: vars.space[index],
      }),
    ]),
  ),
}

export const paddingLeftOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        paddingLeft: vars.space[index],
      }),
    ]),
  ),
}
