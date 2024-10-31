import {FONT_HEADING_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.heading': {
    vars: {
      [varNames.font.weight.regular]: vars.font.heading.weight.regular,
      [varNames.font.weight.medium]: vars.font.heading.weight.medium,
      [varNames.font.weight.semibold]: vars.font.heading.weight.semibold,
      [varNames.font.weight.bold]: vars.font.heading.weight.bold,

      [varNames.font.family]: vars.font.heading.family,
      [varNames.font.featureSettings]: vars.font.heading.featureSettings,
    },

    color: vars.color.fg,

    nest: {
      '& a': {
        color: vars.color.link.fg,
        textDecoration: 'none',
      },

      '& a:hover': {
        color: 'inherit',
      },
    },
  },

  '.heading-muted': {
    vars: {
      [varNames.color.fg]: vars.color.muted.fg,
    },
  },
}

for (const size of FONT_HEADING_SIZE) {
  const v = vars.font.heading.sizes[size]

  _responsiveRule(primitive, `heading-${size}`, {
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

export const headingStyle: Style = {layers: {primitive}}
