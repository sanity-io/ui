import {SPACE} from '@sanity/ui-tokens/constants'

import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'
import type {Padding} from './types'

export const paddingOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {padding: vars.space[index]}, String(index)),
    ]),
  ),
}

export const paddingXOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {paddingLeft: vars.space[index], paddingRight: vars.space[index]},
        `x-${index}`,
      ),
    ]),
  ),
}

export const paddingYOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {paddingTop: vars.space[index], paddingBottom: vars.space[index]},
        `y-${index}`,
      ),
    ]),
  ),
}

export const paddingTopOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {paddingTop: vars.space[index]}, `t-${index}`),
    ]),
  ),
}

export const paddingRightOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {paddingRight: vars.space[index]}, `r-${index}`),
    ]),
  ),
}

export const paddingBottomOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {paddingBottom: vars.space[index]}, `b-${index}`),
    ]),
  ),
}

export const paddingLeftOptions: ResponsiveRuleOptions<Padding> = {
  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(_layers.prop, {paddingLeft: vars.space[index]}, `l-${index}`),
    ]),
  ),
}
