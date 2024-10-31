import {THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'

import {varNames, vars} from '../../theme'
import type {Properties, Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.selectable': {
    'backgroundColor': vars.color.bg,
    'color': vars.color.fg,

    [varNames.color.bg]: vars.color.tinted.bg[0],
    [varNames.color.border]: vars.color.tinted.border[2],
    [varNames.color.fg]: vars.color.tinted.fg[2],

    'nest': {
      'button&': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        border: 0,
        // @ts-expect-error - TODO: fix this
        width: ['-moz-available', '-webkit-fill-available', 'stretch'],
      },

      'a&': {
        outline: 'none',
        textDecoration: 'none',
      },

      ...buildSelectableTones(),
    },

    '@media': {
      '(hover: hover)': {
        nest: {
          '&:not([data-disabled])': {
            cursor: 'pointer',
          },

          '&:not([data-disabled]):hover': {
            [varNames.color.bg]: vars.color.tinted.bg[1],
            [varNames.color.border]: vars.color.tinted.border[3],
            [varNames.color.fg]: vars.color.tinted.fg[1],
            [varNames.color.muted.bg]: vars.color.tinted.bg[2],
            [varNames.color.muted.fg]: vars.color.tinted.fg[4],
          },

          '&:not([data-disabled]):active, &:not([data-disabled])[aria-pressed="true"], &:not([data-disabled])[data-pressed]':
            {
              [varNames.color.bg]: vars.color.tinted.bg[2],
              [varNames.color.border]: vars.color.tinted.border[4],
              [varNames.color.fg]: vars.color.tinted.fg[0],
              [varNames.color.muted.bg]: vars.color.tinted.bg[3],
              [varNames.color.muted.fg]: vars.color.tinted.fg[4],
            },

          '&:not([data-disabled]):focus': {
            [varNames.color.bg]: vars.color.solid.primary.bg[0],
            [varNames.color.border]: vars.color.solid.primary.border[1],
            [varNames.color.fg]: vars.color.solid.primary.fg[0],
            [varNames.color.muted.bg]: vars.color.solid.primary.bg[1],
            [varNames.color.muted.fg]: vars.color.solid.primary.fg[3],
          },

          '&[data-disabled]': {
            [varNames.color.bg]: vars.color.tinted.bg[0],
            [varNames.color.border]: vars.color.tinted.border[1],
            [varNames.color.fg]: vars.color.tinted.border[4],
            [varNames.color.muted.bg]: vars.color.tinted.bg[1],
            [varNames.color.muted.fg]: vars.color.tinted.border[4],
          },
        },
      },
    },
  },
}

export const _selectableStyle: Style = {layers: {primitive}}

function buildSelectableTones(): Record<string, Properties> {
  const rules: Record<string, Properties> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    const target = varNames.color
    const source = vars.color

    rules[`&.${tone}`] = {
      [target.tinted.bg[0]]: source.tinted[tone].bg[0],
      [target.tinted.bg[1]]: source.tinted[tone].bg[1],
      [target.tinted.bg[2]]: source.tinted[tone].bg[2],
      [target.tinted.bg[3]]: source.tinted[tone].bg[3],
      [target.tinted.bg[4]]: source.tinted[tone].bg[4],

      [target.tinted.border[0]]: source.tinted[tone].border[0],
      [target.tinted.border[1]]: source.tinted[tone].border[1],
      [target.tinted.border[2]]: source.tinted[tone].border[2],
      [target.tinted.border[3]]: source.tinted[tone].border[3],
      [target.tinted.border[4]]: source.tinted[tone].border[4],

      [target.tinted.fg[0]]: source.tinted[tone].fg[0],
      [target.tinted.fg[1]]: source.tinted[tone].fg[1],
      [target.tinted.fg[2]]: source.tinted[tone].fg[2],
      [target.tinted.fg[3]]: source.tinted[tone].fg[3],
      [target.tinted.fg[4]]: source.tinted[tone].fg[4],

      [target.solid.bg[0]]: source.solid[tone].bg[0],
      [target.solid.bg[1]]: source.solid[tone].bg[1],
      [target.solid.bg[2]]: source.solid[tone].bg[2],
      [target.solid.bg[3]]: source.solid[tone].bg[3],
      [target.solid.bg[4]]: source.solid[tone].bg[4],

      [target.solid.border[0]]: source.solid[tone].border[0],
      [target.solid.border[1]]: source.solid[tone].border[1],
      [target.solid.border[2]]: source.solid[tone].border[2],
      [target.solid.border[3]]: source.solid[tone].border[3],
      [target.solid.border[4]]: source.solid[tone].border[4],

      [target.solid.fg[0]]: source.solid[tone].fg[0],
      [target.solid.fg[1]]: source.solid[tone].fg[1],
      [target.solid.fg[2]]: source.solid[tone].fg[2],
      [target.solid.fg[3]]: source.solid[tone].fg[3],
      [target.solid.fg[4]]: source.solid[tone].fg[4],
    }
  }

  return rules
}
