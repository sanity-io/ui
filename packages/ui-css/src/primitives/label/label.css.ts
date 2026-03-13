import type {FontLabelSize} from '@sanity/ui-tokens'
import {FONT_LABEL_SIZE} from '@sanity/ui-tokens/constants'
import {globalStyle} from '@vanilla-extract/css'

import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import {fontVars} from '../../props/font/font.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [fontVars.family]: vars.font.label.family,
      [fontVars.featureSettings]: vars.font.label.featureSettings,

      [fontVars.weight.regular]: vars.font.label.weight.regular,
      [fontVars.weight.medium]: vars.font.label.weight.medium,
      [fontVars.weight.semibold]: vars.font.label.weight.semibold,
      [fontVars.weight.bold]: vars.font.label.weight.bold,
    },

    color: vars.color.fg,
    textTransform: 'uppercase',
  },
  '',
)

globalStyle(`${root} a`, {
  '@layer': {
    [_layers.primitive]: {
      color: vars.color.link.fg,
      textDecoration: 'none',
    },
  },
})

globalStyle(`${root} a:hover`, {
  '@layer': {
    [_layers.primitive]: {
      color: vars.color.fg,
    },
  },
})

globalStyle(`${root} code`, {
  '@layer': {
    [_layers.primitive]: {
      'fontFamily': vars.font.code.family,
      'color': vars.color.muted.fg,
      'backgroundColor': vars.color.muted.bg,
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
      color: vars.color.muted.fg,
    },
  },
})

export const muted: string = _style(
  _layers.primitive,
  {
    color: vars.color.muted.fg,
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
              [fontVars.fontSize]: v.fontSize,
              [fontVars.lineHeight]: v.lineHeight,
              [fontVars.ascenderHeight]: v.ascenderHeight,
              [fontVars.descenderHeight]: v.descenderHeight,

              [fontVars.letterSpacing]: v.letterSpacing,
              [fontVars.iconSize]: v.iconSize,
              [fontVars.customIconSize]: v.customIconSize,
            },
          },
          String(s),
        ),
      ]
    }),
  ),
}
