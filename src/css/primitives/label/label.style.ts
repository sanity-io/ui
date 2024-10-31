import {FONT_LABEL_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.label': {
    vars: {
      [varNames.font.weight.regular]: vars.font.label.weight.regular,
      [varNames.font.weight.medium]: vars.font.label.weight.medium,
      [varNames.font.weight.semibold]: vars.font.label.weight.semibold,
      [varNames.font.weight.bold]: vars.font.label.weight.bold,

      [varNames.font.family]: vars.font.label.family,
      [varNames.font.featureSettings]: vars.font.label.featureSettings,
    },

    color: vars.color.fg,
    textTransform: 'uppercase',

    nest: {
      '& a': {
        color: vars.color.link.fg,
        textDecoration: 'none',
      },
    },
  },

  '.label-muted': {
    [varNames.color.fg]: vars.color.muted.fg,
  },
}

for (const size of FONT_LABEL_SIZE) {
  const k = varNames.font
  const v = vars.font.label.sizes[size]

  _responsiveRule(primitive, `label-${size}`, {
    vars: {
      [k.fontSize]: v.fontSize,
      [k.lineHeight]: v.lineHeight,
      [k.letterSpacing]: v.letterSpacing,
      [k.iconSize]: v.iconSize,
      [k.ascenderHeight]: v.ascenderHeight,
      [k.descenderHeight]: v.descenderHeight,
      [k.customIconSize]: v.customIconSize,
    },
  })
}

export const labelStyle: Style = {layers: {primitive}}
