import type {FontWeight} from '@sanity/ui-tokens'
import {globalStyle} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    fontFamily: vars.font.family,
    fontFeatureSettings: vars.font.featureSettings,
    fontSize: vars.font.fontSize,
    lineHeight: vars.font.lineHeight,
    letterSpacing: vars.font.letterSpacing,
    fontWeight: vars.font.fontWeight,
    textTransform: vars.font.textTransform,

    vars: {
      [vars.font.capHeight]:
        `calc(${vars.font.lineHeight} - ${vars.font.ascenderHeight} - ${vars.font.descenderHeight})`,
      [vars.font.iconOffset]: `calc((${vars.font.capHeight} - ${vars.font.iconSize}) / 2)`,
      [vars.font.customIconOffset]:
        `calc((${vars.font.capHeight} - ${vars.font.customIconSize}) / 2)`,
    },

    /**
     * Text-box-trim implementation using ascender/descender metrics
     * Trims whitespace above cap height and below baseline
     */
    selectors: {
      '&::before': {
        content: '""',
        display: 'table',
        marginBottom: `calc(0rem - ${vars.font.ascenderHeight})`,
      },
      '&::after': {
        content: '""',
        display: 'table',
        marginTop: `calc(0rem - ${vars.font.descenderHeight})`,
      },
    },
  },
  '',
)

globalStyle(`${root} svg`, {
  '@layer': {
    [_layers.primitive]: {
      // Some CSS libraries change the defaults for SVG display
      // Ensure SVGs are rendered as inline elements
      display: 'inline',
    },
  },
})

globalStyle(`${root} svg:not([data-sanity-icon])`, {
  '@layer': {
    [_layers.primitive]: {fontSize: vars.font.customIconSize, margin: vars.font.customIconOffset},
  },
})

globalStyle(`${root} [data-sanity-icon]`, {
  '@layer': {
    [_layers.primitive]: {fontSize: vars.font.iconSize, margin: vars.font.iconOffset},
  },
})

export const weightOptions: Record<FontWeight, string> = {
  regular: _style(
    _layers.primitive,
    {vars: {[vars.font.fontWeight]: vars.font.weight.regular}},
    'w-regular',
  ),

  medium: _style(
    //
    _layers.primitive,
    {vars: {[vars.font.fontWeight]: vars.font.weight.medium}},
    'w-medium',
  ),

  semibold: _style(
    _layers.primitive,
    {vars: {[vars.font.fontWeight]: vars.font.weight.semibold}},
    'w-semibold',
  ),

  bold: _style(
    _layers.primitive,
    {vars: {[vars.font.fontWeight]: vars.font.weight.bold}},
    'w-bold',
  ),
}
