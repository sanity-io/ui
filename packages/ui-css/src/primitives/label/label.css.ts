import type {FontLabelSize} from '@sanity/ui-tokens'
import {FONT_LABEL_SIZE} from '@sanity/ui-tokens/constants'
import {fallbackVar, globalStyle} from '@vanilla-extract/css'

import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [vars.font.family]: vars.font.label.family,
      [vars.font.featureSettings]: vars.font.label.featureSettings || undefined,
      [vars.font.textTransform]: vars.font.label.textTransform || undefined,

      [vars.font.weight.regular]: vars.font.label.weight.regular,
      [vars.font.weight.medium]: vars.font.label.weight.medium,
      [vars.font.weight.semibold]: vars.font.label.weight.semibold,
      [vars.font.weight.bold]: vars.font.label.weight.bold,
    },

    color: fallbackVar(vars.font.color.fg, vars.color.fg),
  },
  '',
)

globalStyle(`${root} a`, {
  '@layer': {
    [_layers.primitive]: {
      color: fallbackVar(vars.font.color.link.fg, vars.color.link.fg),
      textDecoration: 'none',
    },
  },
})

globalStyle(`${root} a:hover`, {
  '@layer': {
    [_layers.primitive]: {
      color: fallbackVar(vars.font.color.fg, vars.color.fg),
    },
  },
})

globalStyle(`${root} code`, {
  '@layer': {
    [_layers.primitive]: {
      'fontFamily': vars.font.code.family,
      'color': fallbackVar(vars.font.color.muted.fg, vars.color.muted.fg),
      'backgroundColor': fallbackVar(vars.font.color.muted.bg, vars.color.muted.bg),
      'borderRadius': vars.radius[2],

      '@supports': {
        ['(corner-shape: squircle)']: {
          borderRadius: `calc(${vars.radius[2]} * ${vars.corner.shape.squircle} * ${_CORNER_SHAPE_RADIUS_MULTIPLIER})`,
          // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
          cornerShape: `superellipse(${vars.corner.shape.squircle})`,
        },
      },
    },
  },
})

globalStyle(`${root} svg`, {
  '@layer': {
    [_layers.primitive]: {
      color: fallbackVar(vars.font.color.muted.fg, vars.color.muted.fg),
    },
  },
})

export const muted: string = _style(
  _layers.primitive,
  {
    color: fallbackVar(vars.font.color.muted.fg, vars.color.muted.fg),
  },
  'muted',
)

export const sizes: ResponsiveRuleOptions<FontLabelSize> = {
  ..._fromEntries(
    FONT_LABEL_SIZE.map((s) => {
      const v = vars.font.label.scale[s]

      return [
        s,
        _responsiveStyle(
          _layers.primitive,
          {
            vars: {
              [vars.font.fontSize]: v.fontSize,
              [vars.font.lineHeight]: v.lineHeight,
              [vars.font.ascenderHeight]: v.ascenderHeight,
              [vars.font.descenderHeight]: v.descenderHeight,

              [vars.font.letterSpacing]: v.letterSpacing,
              [vars.font.iconSize]: v.iconSize,
              [vars.font.customIconSize]: v.customIconSize,
            },
          },
          String(s),
        ),
      ]
    }),
  ),
}
