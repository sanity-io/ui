import {FONT_TEXT_SIZE} from '@sanity/ui/theme'
import {globalStyle} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(layers.primitives, {
  vars: {
    [vars.font.family]: vars.font.text.family,
    [vars.font.featureSettings]: vars.font.text.featureSettings,

    [vars.font.weight.regular]: vars.font.text.weight.regular,
    [vars.font.weight.medium]: vars.font.text.weight.medium,
    [vars.font.weight.semibold]: vars.font.text.weight.semibold,
    [vars.font.weight.bold]: vars.font.text.weight.bold,
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

export const muted = _style(layers.primitives, {
  color: vars.color.muted.fg,
})

export const sizes = {
  ..._fromEntries(
    FONT_TEXT_SIZE.map((s) => {
      const v = vars.font.text.scale[s]

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
