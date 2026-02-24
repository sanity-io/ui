import {SPACE} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {Margin} from './types'

export const marginOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    margin: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        margin: vars.space[index],
      }),
    ]),
  ),
}

export const marginXOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginLeft: 'auto',
    marginRight: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginLeft: vars.space[index],
        marginRight: vars.space[index],
      }),
    ]),
  ),
}

export const marginYOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginTop: 'auto',
    marginBottom: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginTop: vars.space[index],
        marginBottom: vars.space[index],
      }),
    ]),
  ),
}

export const marginTopOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginTop: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginTop: vars.space[index],
      }),
    ]),
  ),
}

export const marginRightOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginRight: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginRight: vars.space[index],
      }),
    ]),
  ),
}

export const marginBottomOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginBottom: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginBottom: vars.space[index],
      }),
    ]),
  ),
}

export const marginLeftOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(layers.props, {
    marginLeft: 'auto',
  }),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(layers.props, {
        marginLeft: vars.space[index],
      }),
    ]),
  ),
}
