import {FONT_TEXT_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.text': {
    vars: {
      [varNames.font.family]: vars.font.text.family,
      [varNames.font.featureSettings]: vars.font.text.featureSettings,

      [varNames.font.weight.regular]: vars.font.text.weight.regular,
      [varNames.font.weight.medium]: vars.font.text.weight.medium,
      [varNames.font.weight.semibold]: vars.font.text.weight.semibold,
      [varNames.font.weight.bold]: vars.font.text.weight.bold,
    },

    color: vars.color.fg,

    nest: {
      '& a': {
        color: vars.color.link.fg,
        textDecoration: 'none',
      },

      '& a:hover': {
        color: vars.color.fg,
      },

      '& code': {
        fontFamily: vars.font.code.family,
        color: vars.color.code.fg,
        backgroundColor: vars.color.code.bg,
        borderRadius: vars.radius[2],
      },

      '& svg': {
        color: vars.color.muted.fg,
      },
    },
  },

  '.text-muted': {
    color: vars.color.muted.fg,
  },
}

for (const size of FONT_TEXT_SIZE) {
  const v = vars.font.text.sizes[size]

  _responsiveRule(primitive, `text-${size}`, {
    vars: {
      [varNames.font.fontSize]: v.fontSize,
      [varNames.font.lineHeight]: v.lineHeight,
      [varNames.font.letterSpacing]: v.letterSpacing,
      [varNames.font.iconSize]: v.iconSize,
      [varNames.font.ascenderHeight]: v.ascenderHeight,
      [varNames.font.descenderHeight]: v.descenderHeight,
      [varNames.font.customIconSize]: v.customIconSize,
    },
  })
}

export const textStyle: Style = {layers: {primitive}}
