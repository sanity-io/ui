import {FONT_HEADING_SIZE, type FontHeadingSize} from '@sanity/ui/theme'
import {globalStyle} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  vars: {
    [vars.font.family]: vars.font.heading.family,
    [vars.font.featureSettings]: vars.font.heading.featureSettings,

    [vars.font.weight.regular]: vars.font.heading.weight.regular,
    [vars.font.weight.medium]: vars.font.heading.weight.medium,
    [vars.font.weight.semibold]: vars.font.heading.weight.semibold,
    [vars.font.weight.bold]: vars.font.heading.weight.bold,
  },

  color: vars.color.fg,
})

globalStyle(`${root} a`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.link.fg,
      textDecoration: 'none',
    },
  },
})

globalStyle(`${root} a:hover`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.fg,
    },
  },
})

globalStyle(`${root} code`, {
  '@layer': {
    [layers.primitives]: {
      fontFamily: vars.font.code.family,
      color: vars.color.code.fg,
      backgroundColor: vars.color.code.bg,
      borderRadius: vars.radius[2],
    },
  },
})

globalStyle(`${root} svg`, {
  '@layer': {
    [layers.primitives]: {
      color: vars.color.muted.fg,
    },
  },
})

export const muted: string = _style(layers.primitives, {
  color: vars.color.muted.fg,
})

export const sizes: ResponsiveRuleOptions<FontHeadingSize> = {
  ..._fromEntries(
    FONT_HEADING_SIZE.map((s) => {
      const v = vars.font.heading.scale[s]

      return [
        s,
        _responsiveStyle(layers.primitives, {
          vars: {
            [vars.font.fontSize]: v.fontSize,
            [vars.font.lineHeight]: v.lineHeight,
            [vars.font.letterSpacing]: v.letterSpacing,
            [vars.font.iconSize]: v.iconSize,
            [vars.font.ascenderHeight]: v.ascenderHeight,
            [vars.font.descenderHeight]: v.descenderHeight,
            [vars.font.customIconSize]: v.customIconSize,
          },
        }),
      ]
    }),
  ),
}
