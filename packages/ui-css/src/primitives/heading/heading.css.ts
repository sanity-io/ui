import {FONT_HEADING_SIZE, type FontHeadingSize} from '@sanity/ui-tokens/system'
import {globalStyle} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
// import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {fontVars} from '../../props/font/font.css'
import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../system/_contants'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [fontVars.family]: vars.font.heading.family,
      [fontVars.featureSettings]: vars.font.heading.featureSettings,

      [fontVars.weight.regular]: vars.font.heading.weight.regular,
      [fontVars.weight.medium]: vars.font.heading.weight.medium,
      [fontVars.weight.semibold]: vars.font.heading.weight.semibold,
      [fontVars.weight.bold]: vars.font.heading.weight.bold,
    },

    color: vars.color.fg,
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

export const muted: string = _style(_layers.primitive, {color: vars.color.muted.fg}, 'muted')

export const scale: ResponsiveRuleOptions<FontHeadingSize> = {
  ..._fromEntries(
    FONT_HEADING_SIZE.map((s) => {
      const v = vars.font.heading.scale[s]

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
