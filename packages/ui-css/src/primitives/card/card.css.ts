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
          [vars.color.bg]: vars.card.color.hovered.bg,
          [vars.color.border]: vars.card.color.hovered.border,
          [vars.color.fg]: vars.card.color.hovered.fg,
          [vars.color.muted.bg]: vars.card.color.hovered.muted.bg,
          [vars.color.muted.border]: vars.card.color.hovered.muted.border,
          [vars.color.muted.fg]: vars.card.color.hovered.muted.fg,
        },
      },

      [selectors.pressed]: {
        vars: {
          [vars.color.bg]: vars.card.color.pressed.bg,
          [vars.color.border]: vars.card.color.pressed.border,
          [vars.color.fg]: vars.card.color.pressed.fg,
          [vars.color.muted.bg]: vars.card.color.pressed.muted.bg,
          [vars.color.muted.border]: vars.card.color.pressed.muted.border,
          [vars.color.muted.fg]: vars.card.color.pressed.muted.fg,
        },
      },

      [selectors.selected]: {
        vars: {
          [vars.color.bg]: vars.card.color.selected.bg,
          [vars.color.border]: vars.card.color.selected.border,
          [vars.color.fg]: vars.card.color.selected.fg,
          [vars.color.muted.bg]: vars.card.color.selected.muted.bg,
          [vars.color.muted.border]: vars.card.color.selected.muted.border,
          [vars.color.muted.fg]: vars.card.color.selected.muted.fg,
        },
      },

      [selectors.disabled]: {
        vars: {
          [vars.color.bg]: vars.card.color.disabled.bg,
          [vars.color.border]: vars.card.color.disabled.border,
          [vars.color.fg]: vars.card.color.disabled.fg,
          [vars.color.muted.bg]: vars.card.color.disabled.muted.bg,
          [vars.color.muted.border]: vars.card.color.disabled.muted.border,
          [vars.color.muted.fg]: vars.card.color.disabled.muted.fg,
        },
      },
    },
  },
  '',
)
