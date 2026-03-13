import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

const when = (selector: string) => `&:is(a, button)${selector}`

const selectors = {
  hovered: [when(':hover'), when('[data-hovered]')].join(','),
  pressed: [when(':active'), when('[data-pressed]')].join(','),
  selected: [when('[data-selected]')].join(','),
  disabled: [when(':disabled'), when('[data-disabled]')].join(','),
}

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    color: vars.color.fg,

    selectors: {
      '&:is(a)': {
        outline: 'none',
        textDecoration: 'none',
        color: 'inherit',
      },

      '&:is(button)': {
        WebkitFontSmoothing: 'inherit',
        appearance: 'none',
        outline: 'none',
        font: 'inherit',
        textAlign: 'inherit',
        userSelect: 'none',
      },

      [selectors.hovered]: {
        vars: {
          [vars.color.bg]: vars.color.card.hovered.bg,
          [vars.color.border]: vars.color.card.hovered.border,
          [vars.color.fg]: vars.color.card.hovered.fg,
          [vars.color.muted.bg]: vars.color.card.hovered.muted.bg,
          [vars.color.muted.border]: vars.color.card.hovered.muted.border,
          [vars.color.muted.fg]: vars.color.card.hovered.muted.fg,
        },
      },

      [selectors.pressed]: {
        vars: {
          [vars.color.bg]: vars.color.card.pressed.bg,
          [vars.color.border]: vars.color.card.pressed.border,
          [vars.color.fg]: vars.color.card.pressed.fg,
          [vars.color.muted.bg]: vars.color.card.pressed.muted.bg,
          [vars.color.muted.border]: vars.color.card.pressed.muted.border,
          [vars.color.muted.fg]: vars.color.card.pressed.muted.fg,
        },
      },

      [selectors.selected]: {
        vars: {
          [vars.color.bg]: vars.color.card.selected.bg,
          [vars.color.border]: vars.color.card.selected.border,
          [vars.color.fg]: vars.color.card.selected.fg,
          [vars.color.muted.bg]: vars.color.card.selected.muted.bg,
          [vars.color.muted.border]: vars.color.card.selected.muted.border,
          [vars.color.muted.fg]: vars.color.card.selected.muted.fg,
        },
      },

      [selectors.disabled]: {
        vars: {
          [vars.color.bg]: vars.color.card.disabled.bg,
          [vars.color.border]: vars.color.card.disabled.border,
          [vars.color.fg]: vars.color.card.disabled.fg,
          [vars.color.muted.bg]: vars.color.card.disabled.muted.bg,
          [vars.color.muted.border]: vars.color.card.disabled.muted.border,
          [vars.color.muted.fg]: vars.color.card.disabled.muted.fg,
        },
      },
    },
  },
  '',
)
