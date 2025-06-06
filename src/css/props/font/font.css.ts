import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root = _style(layers.props, {
  'fontFamily': vars.font.family,
  'fontFeatureSettings': vars.font.featureSettings,
  'fontSize': vars.font.fontSize,
  'lineHeight': vars.font.lineHeight,
  'letterSpacing': vars.font.letterSpacing,
  'fontWeight': vars.font.fontWeight,
  'transform': `translateY(${vars.font.descenderHeight})`,
  'padding': '1px 0',
  'margin': '0',

  'vars': {
    [vars.font.capHeight]:
      `calc(${vars.font.lineHeight} - ${vars.font.ascenderHeight} - ${vars.font.descenderHeight})`,
    [vars.font.iconOffset]: `calc((${vars.font.capHeight} - ${vars.font.iconSize}) / 2)`,
    [vars.font.customIconOffset]:
      `calc((${vars.font.capHeight} - ${vars.font.customIconSize}) / 2)`,
  },

  ':before': {
    content: '""',
    display: 'block',
    height: 0,
    marginTop: `calc((0px - ${vars.font.ascenderHeight} - ${vars.font.descenderHeight}) - 1px)`,
  },

  ':after': {
    content: '""',
    display: 'block',
    height: 0,
    marginBottom: '-1px',
  },
})

globalStyle(`${root} svg`, {
  '@layer': {
    [layers.props]: {
      // Certain popular CSS libraries changes the defaults for SVG display
      // Make sure SVGs are rendered as inline elements
      display: 'inline',
    },
  },
})
globalStyle(`${root} svg:not([data-sanity-icon])`, {
  '@layer': {
    [layers.props]: {
      fontSize: vars.font.customIconSize,
      margin: vars.font.customIconOffset,
    },
  },
})

globalStyle(`${root} [data-sanity-icon]`, {
  '@layer': {
    [layers.props]: {
      fontSize: vars.font.iconSize,
      margin: vars.font.iconOffset,
      // vectorEffect: 'non-scaling-stroke',
    },
  },
})

export const weights = {
  regular: _style(layers.props, {
    vars: {
      [vars.font.fontWeight]: vars.font.weight.regular,
    },
  }),

  medium: _style(layers.props, {
    vars: {
      [vars.font.fontWeight]: vars.font.weight.medium,
    },
  }),

  semibold: _style(layers.props, {
    vars: {
      [vars.font.fontWeight]: vars.font.weight.semibold,
    },
  }),

  bold: _style(layers.props, {
    vars: {
      [vars.font.fontWeight]: vars.font.weight.bold,
    },
  }),
}
