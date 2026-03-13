import type {FontWeight} from '@sanity/ui-tokens'
import {createVar, globalStyle} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
// import {vars} from '../../vars.css'

/** @internal */
export const fontVars = {
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
}

export const root: string = _style(
  _layers.prop,
  {
    fontFamily: fontVars.family,
    fontFeatureSettings: fontVars.featureSettings,
    fontSize: fontVars.fontSize,
    lineHeight: fontVars.lineHeight,
    letterSpacing: fontVars.letterSpacing,
    fontWeight: fontVars.fontWeight,

    vars: {
      [fontVars.capHeight]: `calc(${fontVars.lineHeight} - ${fontVars.ascenderHeight} - ${fontVars.descenderHeight})`,
      [fontVars.iconOffset]: `calc((${fontVars.capHeight} - ${fontVars.iconSize}) / 2)`,
      [fontVars.customIconOffset]: `calc((${fontVars.capHeight} - ${fontVars.customIconSize}) / 2)`,
    },

    /**
     * Text-box-trim implementation using ascender/descender metrics
     * Trims whitespace above cap height and below baseline
     */
    selectors: {
      '&::before': {
        content: '""',
        display: 'table',
        marginBottom: `calc(0rem - ${fontVars.ascenderHeight})`,
      },
      '&::after': {
        content: '""',
        display: 'table',
        marginTop: `calc(0rem - ${fontVars.descenderHeight})`,
      },
    },
  },
  '',
)

globalStyle(`${root} svg`, {
  '@layer': {
    [_layers.prop]: {
      // Some CSS libraries change the defaults for SVG display
      // Ensure SVGs are rendered as inline elements
      display: 'inline',
    },
  },
})

globalStyle(`${root} svg:not([data-sanity-icon])`, {
  '@layer': {
    [_layers.prop]: {fontSize: fontVars.customIconSize, margin: fontVars.customIconOffset},
  },
})

globalStyle(`${root} [data-sanity-icon]`, {
  '@layer': {
    [_layers.prop]: {fontSize: fontVars.iconSize, margin: fontVars.iconOffset},
  },
})

export const weightOptions: Record<FontWeight, string> = {
  regular: _style(
    _layers.prop,
    {vars: {[fontVars.fontWeight]: fontVars.weight.regular}},
    'w-regular',
  ),

  medium: _style(
    //
    _layers.prop,
    {vars: {[fontVars.fontWeight]: fontVars.weight.medium}},
    'w-medium',
  ),

  semibold: _style(
    _layers.prop,
    {vars: {[fontVars.fontWeight]: fontVars.weight.semibold}},
    'w-semibold',
  ),

  bold: _style(_layers.prop, {vars: {[fontVars.fontWeight]: fontVars.weight.bold}}, 'w-bold'),
}
