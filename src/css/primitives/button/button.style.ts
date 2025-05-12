import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {Style, StyleRules} from '../../types'
import {varNames} from '../../varNames'
import {vars} from '../../vars'
import {toneMap, variantMap} from './_constants'

const primitive: StyleRules = {
  '.button': {
    'WebkitFontSmoothing': 'inherit',
    'appearance': 'none',
    'font': 'inherit',
    'outline': 'none',
    'userSelect': 'none',
    'textDecoration': 'none',
    'border': 0,
    'boxSizing': 'border-box',
    'padding': 0,
    'overflow': 'hidden',
    'margin': 0,
    'textAlign': 'left',
    'position': 'relative',
    'verticalAlign': 'top',
    'backgroundColor': vars.color.bg,
    'color': vars.color.fg,
    'boxShadow': 'var(--button-box-shadow)',

    '@nest': {
      '&::-moz-focus-inner': {
        border: 0,
        padding: 0,
      },

      '&:focus': {
        outline: 'var(--button-focus-ring-width) solid var(--color-focus-ring)',
        outlineOffset: 'var(--button-focus-ring-offset)',
      },

      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },
    },
  },

  '.button-loading-box': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: vars.color.bg,
    borderRadius: 'inherit',
    zIndex: 1,
    opacity: 0.8,
  },
}

for (const tone of THEME_COLOR_STATE_TONES) {
  const solid = vars.color.solid[tone]
  const tinted = vars.color.tinted[tone]

  // mode: default
  primitive[`.button.${variantMap.default}.${toneMap[tone]}`] = {
    [varNames.color.bg]: solid.bg[0],
    [varNames.color.border]: solid.border[1],
    [varNames.color.fg]: solid.fg[0],
    [varNames.color.muted.fg]: solid.fg[4],
    '--button-box-shadow': 'none',

    '@nest': {
      '&:not([data-disabled]):hover': {
        [varNames.color.bg]: solid.bg[1],
        [varNames.color.border]: solid.border[2],
        [varNames.color.fg]: solid.fg[0],
        [varNames.color.muted.fg]: solid.fg[4],
      },

      '&:not([data-disabled]):active': {
        [varNames.color.bg]: solid.bg[2],
        [varNames.color.border]: solid.border[3],
        [varNames.color.fg]: solid.fg[0],
        [varNames.color.muted.fg]: solid.fg[4],
      },

      '&:not([data-disabled])[data-selected]': {
        [varNames.color.bg]: solid.bg[2],
        [varNames.color.border]: solid.border[3],
        [varNames.color.fg]: solid.fg[0],
        [varNames.color.muted.fg]: solid.fg[4],
      },

      '&[data-disabled]': {
        [varNames.color.bg]: vars.color.default.tinted.bg[1],
        [varNames.color.border]: vars.color.default.tinted.border[0],
        [varNames.color.fg]: vars.color.default.tinted.fg[2],
        [varNames.color.muted.fg]: vars.color.default.tinted.fg[1],
      },
    },
  }

  // mode: ghost
  primitive[`.button.${variantMap.ghost}.${toneMap[tone]}`] = {
    [varNames.color.bg]: tinted.bg[0],
    [varNames.color.border]: tinted.border[1],
    [varNames.color.fg]: tinted.fg[2],
    '--button-box-shadow': [
      `inset 0 0 0 var(--button-border-width) var(--color-border)`,
      `inset 0 -1.5px 0 0.5px var(--color-shadow-umbra)`,
    ].join(','),

    '@nest': {
      '&:not([data-disabled]):hover': {
        [varNames.color.bg]: tinted.bg[1],
        [varNames.color.border]: tinted.border[2],
        [varNames.color.fg]: tinted.fg[1],
        // '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
      },

      '&:not([data-disabled]):active': {
        [varNames.color.bg]: tinted.bg[2],
        [varNames.color.border]: tinted.border[3],
        [varNames.color.fg]: tinted.fg[1],
        '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
      },

      '&:not([data-disabled])[data-selected]': {
        [varNames.color.bg]: tinted.bg[2],
        [varNames.color.border]: tinted.border[3],
        [varNames.color.fg]: tinted.fg[1],
        '--button-box-shadow': `inset 0 0 0 var(--button-border-width) var(--color-border)`,
      },

      '&[data-disabled]': {
        [varNames.color.bg]: vars.color.default.tinted.bg[0],
        [varNames.color.border]: vars.color.default.tinted.border[0],
        [varNames.color.fg]: vars.color.default.tinted.fg[2],
      },
    },
  }

  // mode: bleed
  primitive[`.button.${variantMap.bleed}.${toneMap[tone]}`] = {
    'boxShadow': 'none',
    [varNames.color.bg]: tinted.bg[0],
    [varNames.color.border]: tinted.border[1],
    [varNames.color.fg]: tinted.fg[2],
    [varNames.color.muted.fg]: tinted.fg[4],
    '--button-box-shadow': 'none',

    '@nest': {
      '&:not([data-disabled]):hover': {
        [varNames.color.bg]: tinted.bg[1],
        [varNames.color.border]: tinted.border[2],
        [varNames.color.fg]: tinted.fg[1],
        [varNames.color.muted.fg]: tinted.fg[3],
      },

      '&:not([data-disabled]):active': {
        [varNames.color.bg]: tinted.bg[2],
        [varNames.color.border]: tinted.border[3],
        [varNames.color.fg]: tinted.fg[1],
        [varNames.color.muted.fg]: tinted.fg[3],
      },

      '&:not([data-disabled])[data-selected]': {
        [varNames.color.bg]: tinted.bg[2],
        [varNames.color.border]: tinted.border[3],
        [varNames.color.fg]: tinted.fg[1],
        [varNames.color.muted.fg]: tinted.fg[3],
      },

      '&[data-disabled]': {
        [varNames.color.bg]: vars.color.default.tinted.bg[0],
        [varNames.color.border]: vars.color.default.tinted.border[0],
        [varNames.color.fg]: vars.color.default.tinted.fg[2],
        [varNames.color.muted.fg]: vars.color.default.tinted.fg[1],
      },
    },
  }
}

export const buttonStyle: Style = {layers: {primitive}}
