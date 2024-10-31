import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.button': {
    WebkitFontSmoothing: 'inherit',
    appearance: 'none',
    font: 'inherit',
    outline: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    border: 0,
    boxSizing: 'border-box',
    padding: 0,
    overflow: 'hidden',
    margin: 0,
    textAlign: 'left',
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: vars.color.bg,
    color: vars.color.fg,
    boxShadow: vars.button.boxShadow,
    alignItems: 'center',

    nest: {
      '&::-moz-focus-inner': {
        border: 0,
        padding: 0,
      },

      '&:focus': {
        outline: `${vars.button.focusRing.width} solid ${vars.color.focusRing}`,
        outlineOffset: vars.button.focusRing.offset,
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
  primitive[`.button[data-mode="default"][data-tone="${tone}"]`] = {
    vars: {
      [varNames.color.bg]: solid.bg[0],
      [varNames.color.border]: solid.border[1],
      [varNames.color.code.bg]: solid.bg[1],
      [varNames.color.code.fg]: solid.fg[4],
      [varNames.color.fg]: solid.fg[0],
      [varNames.color.muted.bg]: solid.bg[1],
      [varNames.color.muted.fg]: solid.fg[4],
      [varNames.button.boxShadow]: 'none',
    },

    nest: {
      '&:not([data-disabled]):hover': {
        vars: {
          [varNames.color.bg]: solid.bg[1],
          [varNames.color.border]: solid.border[2],
          [varNames.color.code.bg]: solid.bg[2],
          [varNames.color.code.fg]: solid.fg[4],
          [varNames.color.fg]: solid.fg[0],
          [varNames.color.muted.bg]: solid.bg[2],
          [varNames.color.muted.fg]: solid.fg[4],
        },
      },

      '&:not([data-disabled]):active': {
        vars: {
          [varNames.color.bg]: solid.bg[2],
          [varNames.color.border]: solid.border[3],
          [varNames.color.code.bg]: solid.bg[3],
          [varNames.color.code.fg]: solid.fg[4],
          [varNames.color.fg]: solid.fg[0],
          [varNames.color.muted.bg]: solid.bg[3],
          [varNames.color.muted.fg]: solid.fg[4],
        },
      },

      '&:not([data-disabled])[data-selected]': {
        vars: {
          [varNames.color.bg]: solid.bg[2],
          [varNames.color.border]: solid.border[3],
          [varNames.color.code.bg]: solid.bg[3],
          [varNames.color.code.fg]: solid.fg[4],
          [varNames.color.fg]: solid.fg[0],
          [varNames.color.muted.bg]: solid.bg[3],
          [varNames.color.muted.fg]: solid.fg[4],
        },
      },

      '&[data-disabled]': {
        vars: {
          [varNames.color.avatar.blue.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.purple.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.magenta.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.red.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.orange.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.yellow.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.green.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.avatar.cyan.bg]: vars.color.tinted.default.bg[3],
          [varNames.color.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.border]: vars.color.tinted.default.border[1],
          [varNames.color.code.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.code.fg]: vars.color.tinted.default.border[4],
          [varNames.color.fg]: vars.color.tinted.default.border[4],
          [varNames.color.muted.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.muted.fg]: vars.color.tinted.default.border[4],
        },
      },
    },
  }

  // mode: ghost
  primitive[`.button[data-mode="ghost"][data-tone="${tone}"]`] = {
    vars: {
      [varNames.color.bg]: tinted.bg[1],
      [varNames.color.border]: tinted.border[1],
      [varNames.color.fg]: tinted.fg[2],
      [varNames.color.code.bg]: tinted.bg[2],
      [varNames.color.code.fg]: tinted.fg[4],
      [varNames.color.muted.bg]: tinted.bg[2],
      [varNames.color.muted.fg]: tinted.fg[4],
      [varNames.button.boxShadow]: `inset 0 0 0 ${vars.button.border.width} ${vars.color.border}`,
    },

    nest: {
      '&:not([data-disabled]):hover': {
        vars: {
          [varNames.color.bg]: tinted.bg[2],
          [varNames.color.border]: tinted.border[2],
          [varNames.color.code.bg]: tinted.bg[3],
          [varNames.color.code.fg]: tinted.fg[3],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[3],
          [varNames.color.muted.fg]: tinted.fg[3],
        },
      },

      '&:not([data-disabled]):active': {
        vars: {
          [varNames.color.bg]: tinted.bg[3],
          [varNames.color.border]: tinted.border[3],
          [varNames.color.code.bg]: tinted.bg[4],
          [varNames.color.code.fg]: tinted.fg[3],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[4],
          [varNames.color.muted.fg]: tinted.fg[3],
          [varNames.button.boxShadow]:
            `inset 0 0 0 ${vars.button.border.width} ${vars.color.border}`,
        },
      },

      '&:not([data-disabled])[data-selected]': {
        vars: {
          [varNames.color.bg]: tinted.bg[3],
          [varNames.color.border]: tinted.border[3],
          [varNames.color.code.bg]: tinted.bg[4],
          [varNames.color.code.fg]: tinted.fg[3],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[4],
          [varNames.color.muted.fg]: tinted.fg[3],
          [varNames.button.boxShadow]:
            `inset 0 0 0 ${vars.button.border.width} ${vars.color.border}`,
        },
      },

      '&[data-disabled]': {
        vars: {
          [varNames.color.avatar.blue.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.purple.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.magenta.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.red.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.orange.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.yellow.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.green.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.cyan.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.border]: vars.color.tinted.default.border[0],
          [varNames.color.code.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.code.fg]: vars.color.tinted.default.border[3],
          [varNames.color.fg]: vars.color.tinted.default.border[4],
          [varNames.color.muted.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.muted.fg]: vars.color.tinted.default.border[3],
        },
      },
    },
  }

  // mode: bleed
  primitive[`.button[data-mode="bleed"][data-tone="${tone}"]`] = {
    boxShadow: 'none',
    vars: {
      [varNames.color.bg]: tinted.bg[0],
      [varNames.color.border]: tinted.border[1],
      [varNames.color.fg]: tinted.fg[2],
      [varNames.color.muted.bg]: tinted.bg[1],
      [varNames.color.muted.fg]: tinted.fg[4],
      [varNames.button.boxShadow]: 'none',
    },

    nest: {
      '&:not([data-disabled]):hover': {
        vars: {
          [varNames.color.bg]: tinted.bg[1],
          [varNames.color.border]: tinted.border[2],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[2],
          [varNames.color.muted.fg]: tinted.fg[3],
        },
      },

      '&:not([data-disabled]):active': {
        vars: {
          [varNames.color.bg]: tinted.bg[2],
          [varNames.color.border]: tinted.border[3],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[3],
          [varNames.color.muted.fg]: tinted.fg[3],
        },
      },

      '&:not([data-disabled])[data-selected]': {
        vars: {
          [varNames.color.bg]: tinted.bg[2],
          [varNames.color.border]: tinted.border[3],
          [varNames.color.fg]: tinted.fg[1],
          [varNames.color.muted.bg]: tinted.bg[3],
          [varNames.color.muted.fg]: tinted.fg[3],
        },
      },

      '&[data-disabled]': {
        vars: {
          [varNames.color.avatar.blue.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.purple.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.magenta.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.red.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.orange.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.yellow.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.green.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.avatar.cyan.bg]: vars.color.tinted.default.bg[2],
          [varNames.color.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.border]: vars.color.tinted.default.border[0],
          [varNames.color.code.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.code.fg]: vars.color.tinted.default.border[3],
          [varNames.color.fg]: vars.color.tinted.default.border[4],
          [varNames.color.muted.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.muted.fg]: vars.color.tinted.default.border[3],
        },
      },
    },
  }
}

export const buttonStyle: Style = {layers: {primitive}}
