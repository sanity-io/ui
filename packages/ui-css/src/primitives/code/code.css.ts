import type {FontCodeSize} from '@sanity/ui-tokens'
import {FONT_CODE_SIZE} from '@sanity/ui-tokens/constants'
import {globalStyle} from '@vanilla-extract/css'

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
      [fontVars.family]: vars.font.code.family,
      [fontVars.featureSettings]: vars.font.code.featureSettings || undefined,

      [fontVars.weight.regular]: vars.font.code.weight.regular,
      [fontVars.weight.medium]: vars.font.code.weight.medium,
      [fontVars.weight.semibold]: vars.font.code.weight.semibold,
      [fontVars.weight.bold]: vars.font.code.weight.bold,
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
