import type {FontWeight} from '@sanity/ui-tokens'
import {createVar, globalStyle} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

/** @internal */
export const _fontVars = {
  family: createVar('font-family'),
  featureSettings: createVar('font-feature-settings'),

  capHeight: createVar('cap-height'),
  fontSize: createVar('font-size'),
  lineHeight: createVar('line-height'),
  ascenderHeight: createVar('ascender-height'),
  descenderHeight: createVar('descender-height'),
  letterSpacing: createVar('letter-spacing'),
  fontWeight: createVar('font-weight'),
  iconSize: createVar('icon-size'),
  iconOffset: createVar('icon-offset'),
  customIconOffset: createVar('custom-icon-offset'),
  customIconSize: createVar('custom-icon-size'),

  weight: {
    regular: createVar('regular'),
    medium: createVar('medium'),
    semibold: createVar('semibold'),
    bold: createVar('bold'),
  },

  color: {
    fg: createVar('text-color-fg'),
    muted: {
      bg: createVar('text-color-muted-bg'),
      fg: createVar('text-color-muted-fg'),
    },
    link: {
      fg: createVar('text-color-link-fg'),
      hover: createVar('text-color-link-hover-fg'),
    },
  },
}

export const root: string = _style(
  _layers.primitive,
  {
    fontFamily: _fontVars.family,
    fontFeatureSettings: _fontVars.featureSettings,
    fontSize: _fontVars.fontSize,
    lineHeight: _fontVars.lineHeight,
    letterSpacing: _fontVars.letterSpacing,
    fontWeight: _fontVars.fontWeight,

    vars: {
      [_fontVars.capHeight]: `calc(${_fontVars.lineHeight} - ${_fontVars.ascenderHeight} - ${_fontVars.descenderHeight})`,
      [_fontVars.iconOffset]: `calc((${_fontVars.capHeight} - ${_fontVars.iconSize}) / 2)`,
      [_fontVars.customIconOffset]: `calc((${_fontVars.capHeight} - ${_fontVars.customIconSize}) / 2)`,
    },

    /**
     * Text-box-trim implementation using ascender/descender metrics
     * Trims whitespace above cap height and below baseline
     */
    selectors: {
      '&::before': {
        content: '""',
        display: 'table',
        marginBottom: `calc(0rem - ${_fontVars.ascenderHeight})`,
      },
      '&::after': {
        content: '""',
        display: 'table',
        marginTop: `calc(0rem - ${_fontVars.descenderHeight})`,
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
    [_layers.primitive]: {fontSize: _fontVars.customIconSize, margin: _fontVars.customIconOffset},
  },
})

globalStyle(`${root} [data-sanity-icon]`, {
  '@layer': {
    [_layers.primitive]: {fontSize: _fontVars.iconSize, margin: _fontVars.iconOffset},
  },
})

export const weightOptions: Record<FontWeight, string> = {
  regular: _style(
    _layers.primitive,
    {vars: {[_fontVars.fontWeight]: _fontVars.weight.regular}},
    'w-regular',
  ),

  medium: _style(
    //
    _layers.primitive,
    {vars: {[_fontVars.fontWeight]: _fontVars.weight.medium}},
    'w-medium',
  ),

  semibold: _style(
    _layers.primitive,
    {vars: {[_fontVars.fontWeight]: _fontVars.weight.semibold}},
    'w-semibold',
  ),

  bold: _style(
    _layers.primitive,
    {vars: {[_fontVars.fontWeight]: _fontVars.weight.bold}},
    'w-bold',
  ),
}
