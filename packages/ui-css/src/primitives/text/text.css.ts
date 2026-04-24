import type {FontTextSize} from '@sanity/ui-tokens'
import {FONT_TEXT_SIZE} from '@sanity/ui-tokens/constants'
import {fallbackVar} from '@vanilla-extract/css'

import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../constants'
import {_layers} from '../../layers.css'
import {_fromEntries} from '../../lib/_fromEntries'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_responsiveStyle} from '../../lib/css/_responsiveStyle.css'
import {_style} from '../../lib/css/_style.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars'
import {_fontVars} from '../_font/_font.css'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [_fontVars.family]: vars.font.text.family,
      [_fontVars.featureSettings]: vars.font.text.featureSettings || undefined,
      [_fontVars.textTransform]: vars.font.text.textTransform || undefined,

      [_fontVars.weight.regular]: vars.font.text.weight.regular,
      [_fontVars.weight.medium]: vars.font.text.weight.medium,
      [_fontVars.weight.semibold]: vars.font.text.weight.semibold,
      [_fontVars.weight.bold]: vars.font.text.weight.bold,
    },

    color: fallbackVar(_fontVars.color.fg, vars.color.fg),
  },
  '',
)

_globalStyle(_layers.primitive, `${root} a`, {
  'color': fallbackVar(_fontVars.color.link.fg, vars.color.link.fg),
  'textDecoration': 'none',
  'borderRadius': vars.radius[2],
  'outline': 'none',

  '@supports': {
    ['(corner-shape: squircle)']: {
      borderRadius: `calc(${vars.radius[2]} * ${vars.corner.shape.squircle} * ${_CORNER_SHAPE_RADIUS_MULTIPLIER})`,
      // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
      cornerShape: `superellipse(${vars.corner.shape.squircle})`,
    },
  },
})

_globalStyle(_layers.primitive, `${root} a:hover`, {
  color: fallbackVar(_fontVars.color.link.hover, vars.color.fg),
})

_globalStyle(_layers.primitive, `${root} a:focus:focus-visible`, {
  boxShadow: vars.focus.ring.default,
})

_globalStyle(_layers.primitive, `${root} code`, {
  'fontFamily': vars.font.code.family,
  'color': fallbackVar(_fontVars.color.muted.fg, vars.color.muted.fg),
  'backgroundColor': fallbackVar(_fontVars.color.muted.bg, vars.color.muted.bg),
  'borderRadius': vars.radius[2],

  '@supports': {
    ['(corner-shape: squircle)']: {
      borderRadius: `calc(${vars.radius[2]} * ${vars.corner.shape.squircle} * ${_CORNER_SHAPE_RADIUS_MULTIPLIER})`,
      // @ts-expect-error - `cornerShape` is not yet fully supported in CSS
      cornerShape: `superellipse(${vars.corner.shape.squircle})`,
    },
  },
})

_globalStyle(_layers.primitive, `${root} svg`, {
  color: fallbackVar(_fontVars.color.muted.fg, vars.color.muted.fg),
})

export const muted: string = _style(
  _layers.primitive,
  {
    color: fallbackVar(_fontVars.color.muted.fg, vars.color.muted.fg),
  },
  'muted',
)

export const sizes: ResponsiveRuleOptions<FontTextSize> = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => {
      const v = vars.font.text.scale[s]

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
