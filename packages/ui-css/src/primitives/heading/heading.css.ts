import type {FontHeadingSize} from '@sanity/ui-tokens'
import {FONT_HEADING_SIZE} from '@sanity/ui-tokens/constants'
import {globalStyle} from '@vanilla-extract/css'

import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'
import {_fontVars} from '../_font/_font.css'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [_fontVars.family]: vars.font.heading.family,
      [_fontVars.featureSettings]: vars.font.heading.featureSettings || undefined,
      [_fontVars.textTransform]: vars.font.heading.textTransform || undefined,

      [_fontVars.weight.regular]: vars.font.heading.weight.regular,
      [_fontVars.weight.medium]: vars.font.heading.weight.medium,
      [_fontVars.weight.semibold]: vars.font.heading.weight.semibold,
      [_fontVars.weight.bold]: vars.font.heading.weight.bold,
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
              [_fontVars.fontSize]: v.fontSize,
              [_fontVars.lineHeight]: v.lineHeight,
              [_fontVars.ascenderHeight]: v.ascenderHeight,
              [_fontVars.descenderHeight]: v.descenderHeight,
              [_fontVars.letterSpacing]: v.letterSpacing,
              [_fontVars.iconSize]: v.iconSize,
              [_fontVars.customIconSize]: v.customIconSize,
            },
          },
          String(s),
        ),
      ]
    }),
  ),
}
