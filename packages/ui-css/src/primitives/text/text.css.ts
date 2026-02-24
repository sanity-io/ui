import {FONT_TEXT_SIZE, type FontTextSize} from '@sanity/ui-tokens/system'

import {_fromEntries} from '../../_fromEntries'
import {_globalStyle} from '../../_globalStyle.css'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {fontVars} from '../../props/font/font.css'
import {_CORNER_SHAPE_RADIUS_MULTIPLIER} from '../../system/_contants'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const root: string = _style(
  _layers.primitive,
  {
    vars: {
      [fontVars.family]: vars.font.text.family,
      [fontVars.weight.regular]: vars.font.text.weight.regular,
      [fontVars.weight.medium]: vars.font.text.weight.medium,
      [fontVars.weight.semibold]: vars.font.text.weight.semibold,
      [fontVars.weight.bold]: vars.font.text.weight.bold,
    },

    color: vars.color.fg,
  },
  '',
)

_globalStyle(_layers.primitive, `${root} a`, {
  'color': vars.color.link.fg,
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
  color: vars.color.fg,
})

_globalStyle(_layers.primitive, `${root} a:focus:focus-visible`, {
  boxShadow: vars.focusRing.default,
})

_globalStyle(_layers.primitive, `${root} code`, {
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
})

_globalStyle(_layers.primitive, `${root} svg`, {
  color: vars.color.muted.fg,
})

export const muted: string = _style(_layers.primitive, {color: vars.color.muted.fg}, 'muted')

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
