import type {BorderStyle, BorderWidth} from '@sanity/ui-tokens/system'
import {createVar} from '@vanilla-extract/css'

import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

const boxVars = {
  borderWidth: createVar('border-width'),
}

export const borderOptions: ResponsiveRuleOptions<BorderStyle> = {
  default: _responsiveStyle(
    _layers.prop,
    {borderWidth: boxVars.borderWidth, borderStyle: 'solid', borderColor: vars.color.border},
    'default',
  ),
  muted: _responsiveStyle(
    _layers.prop,
    {borderWidth: boxVars.borderWidth, borderStyle: 'solid', borderColor: vars.color.muted.border},
    'muted',
  ),
  none: _responsiveStyle(_layers.prop, {border: 'none'}, 'none'),
}

export const borderTopOptions: ResponsiveRuleOptions<BorderStyle> = {
  default: _responsiveStyle(
    _layers.prop,
    {
      borderTopWidth: boxVars.borderWidth,
      borderTopStyle: 'solid',
      borderTopColor: vars.color.border,
    },
    't-default',
  ),
  muted: _responsiveStyle(
    _layers.prop,
    {
      borderTopWidth: boxVars.borderWidth,
      borderTopStyle: 'solid',
      borderTopColor: vars.color.muted.border,
    },
    't-muted',
  ),
  none: _responsiveStyle(_layers.prop, {borderTop: 'none'}, 't-none'),
}

export const borderRightOptions: ResponsiveRuleOptions<BorderStyle> = {
  default: _responsiveStyle(
    _layers.prop,
    {
      borderRightWidth: boxVars.borderWidth,
      borderRightStyle: 'solid',
      borderRightColor: vars.color.border,
    },
    'r-default',
  ),
  muted: _responsiveStyle(
    _layers.prop,
    {
      borderRightWidth: boxVars.borderWidth,
      borderRightStyle: 'solid',
      borderRightColor: vars.color.muted.border,
    },
    'r-muted',
  ),
  none: _responsiveStyle(_layers.prop, {borderRight: 'none'}, 'r-none'),
}

export const borderBottomOptions: ResponsiveRuleOptions<BorderStyle> = {
  default: _responsiveStyle(
    _layers.prop,
    {
      borderBottomWidth: boxVars.borderWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: vars.color.border,
    },
    'b-default',
  ),
  muted: _responsiveStyle(
    _layers.prop,
    {
      borderBottomWidth: boxVars.borderWidth,
      borderBottomStyle: 'solid',
      borderBottomColor: vars.color.muted.border,
    },
    'b-muted',
  ),
  none: _responsiveStyle(_layers.prop, {borderBottom: 'none'}, 'b-none'),
}

export const borderLeftOptions: ResponsiveRuleOptions<BorderStyle> = {
  default: _responsiveStyle(
    _layers.prop,
    {
      borderLeftWidth: boxVars.borderWidth,
      borderLeftStyle: 'solid',
      borderLeftColor: vars.color.border,
    },
    'l-default',
  ),
  muted: _responsiveStyle(
    _layers.prop,
    {
      borderLeftWidth: boxVars.borderWidth,
      borderLeftStyle: 'solid',
      borderLeftColor: vars.color.muted.border,
    },
    'l-muted',
  ),
  none: _responsiveStyle(_layers.prop, {borderLeft: 'none'}, 'l-none'),
}

export const borderWidthOptions: ResponsiveRuleOptions<BorderWidth> = {
  [0]: _responsiveStyle(_layers.prop, {vars: {[boxVars.borderWidth]: vars.border[0]}}, 'w-0'),
  [1]: _responsiveStyle(_layers.prop, {vars: {[boxVars.borderWidth]: vars.border[1]}}, 'w-1'),
  [2]: _responsiveStyle(_layers.prop, {vars: {[boxVars.borderWidth]: vars.border[2]}}, 'w-2'),
}
