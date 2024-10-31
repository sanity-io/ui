import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

export const primitive: StyleRules = {
  '.font': {
    fontFamily: vars.font.family,
    fontFeatureSettings: vars.font.featureSettings,
    fontSize: vars.font.fontSize,
    lineHeight: vars.font.lineHeight,
    letterSpacing: vars.font.letterSpacing,
    fontWeight: vars.font.fontWeight,
    transform: `translateY(${vars.font.descenderHeight})`,
    padding: '1px 0',
    margin: '0',

    vars: {
      [varNames.font.capHeight]:
        `calc(${vars.font.lineHeight} - ${vars.font.ascenderHeight} - ${vars.font.descenderHeight})`,
      [varNames.font.iconOffset]: `calc((${vars.font.capHeight} - ${vars.font.iconSize}) / 2)`,
      [varNames.font.customIconOffset]:
        `calc((${vars.font.capHeight} - ${vars.font.customIconSize}) / 2)`,
    },

    nest: {
      '&:before': {
        content: '""',
        display: 'block',
        height: 0,
        marginTop: `calc((0px - ${vars.font.ascenderHeight} - ${vars.font.descenderHeight}) - 1px)`,
      },

      '&:after': {
        content: '""',
        display: 'block',
        height: 0,
        marginBottom: '-1px',
      },

      '& svg': {
        // Certain popular CSS libraries changes the defaults for SVG display
        // Make sure SVGs are rendered as inline elements
        display: 'inline',
      },

      '& svg:not([data-sanity-icon])': {
        fontSize: vars.font.customIconSize,
        margin: vars.font.customIconOffset,
      },

      '& [data-sanity-icon]': {
        fontSize: vars.font.iconSize,
        margin: vars.font.iconOffset,
        vectorEffect: 'non-scaling-stroke',
      },
    },
  },

  '.font-regular': {
    vars: {
      [varNames.font.fontWeight]: vars.font.weight.regular,
    },
  },

  '.font-medium': {
    vars: {
      [varNames.font.fontWeight]: vars.font.weight.medium,
    },
  },

  '.font-semibold': {
    vars: {
      [varNames.font.fontWeight]: vars.font.weight.semibold,
    },
  },

  '.font-bold': {
    vars: {
      [varNames.font.fontWeight]: vars.font.weight.bold,
    },
  },
}

export const fontStyle: Style = {layers: {primitive}}
