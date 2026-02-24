import {SPACE} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {Margin} from './types'

export const marginOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      margin: 'auto',
    },
    'auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          margin: vars.space[index],
        },
        index.toString(),
      ),
    ]),
  ),
}

export const marginXOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    'x-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginLeft: vars.space[index],
          marginRight: vars.space[index],
        },
        `x-${index}`,
      ),
    ]),
  ),
}

export const marginYOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    'y-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginTop: vars.space[index],
          marginBottom: vars.space[index],
        },
        `y-${index}`,
      ),
    ]),
  ),
}

export const marginTopOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginTop: 'auto',
    },
    't-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginTop: vars.space[index],
        },
        `t-${index}`,
      ),
    ]),
  ),
}

export const marginRightOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginRight: 'auto',
    },
    'r-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginRight: vars.space[index],
        },
        `r-${index}`,
      ),
    ]),
  ),
}

export const marginBottomOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginBottom: 'auto',
    },
    'b-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginBottom: vars.space[index],
        },
        `b-${index}`,
      ),
    ]),
  ),
}

export const marginLeftOptions: ResponsiveRuleOptions<Margin> = {
  auto: _responsiveStyle(
    _layers.prop,
    {
      marginLeft: 'auto',
    },
    'l-auto',
  ),

  ..._fromEntries(
    SPACE.map((index) => [
      index,
      _responsiveStyle(
        _layers.prop,
        {
          marginLeft: vars.space[index],
        },
        `l-${index}`,
      ),
    ]),
  ),
}
