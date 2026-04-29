import type {FontCodeSize} from '@sanity/ui-tokens'
import {FONT_CODE_SIZE} from '@sanity/ui-tokens/constants'
import {globalStyle} from '@vanilla-extract/css'

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
      [vars.font.family]: vars.font.code.family,
      [vars.font.featureSettings]: vars.font.code.featureSettings || undefined,
      [vars.font.textTransform]: vars.font.code.textTransform || undefined,

      [vars.font.weight.regular]: vars.font.code.weight.regular,
      [vars.font.weight.medium]: vars.font.code.weight.medium,
      [vars.font.weight.semibold]: vars.font.code.weight.semibold,
      [vars.font.weight.bold]: vars.font.code.weight.bold,
    },

    color: vars.color.muted.fg,
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

globalStyle(`${root} svg`, {
  '@layer': {
    [_layers.primitive]: {
      color: vars.color.muted.fg,
    },
  },
})

globalStyle(`${root} code`, {
  '@layer': {
    [_layers.primitive]: {
      fontFamily: 'inherit',
    },
  },
})

export const scale: ResponsiveRuleOptions<FontCodeSize> = {
  ..._fromEntries(
    FONT_CODE_SIZE.map((s) => {
      const v = vars.font.code.scale[s]

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
