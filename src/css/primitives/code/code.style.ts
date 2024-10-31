import {FONT_CODE_SIZE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.code': {
    vars: {
      [varNames.font.weight.regular]: vars.font.code.weight.regular,
      [varNames.font.weight.medium]: vars.font.code.weight.medium,
      [varNames.font.weight.semibold]: vars.font.code.weight.semibold,
      [varNames.font.weight.bold]: vars.font.code.weight.bold,

      [varNames.font.family]: vars.font.code.family,
      [varNames.font.featureSettings]: vars.font.code.featureSettings,
    },

    color: vars.color.code.fg,

    nest: {
      '& > code': {
        fontFamily: 'inherit',
      },

      '& a': {
        color: vars.color.link.fg,
        textDecoration: 'none',
        borderRadius: '1px',
      },

      '& svg': {
        // Some popular CSS libraries change the defaults for SVG display
        // Make sure SVGs are rendered as inline elements
        display: 'inline',
      },

      '& [data-sanity-icon]': {
        verticalAlign: 'baseline',
      },
    },
  },
}

for (const size of FONT_CODE_SIZE) {
  const v = vars.font.code.sizes[size]

  _responsiveRule(primitive, `code-${size}`, {
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

export const codeStyle: Style = {layers: {primitive}}
