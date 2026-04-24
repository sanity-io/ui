import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

const when = (selector: string) => `&:is(a, button)${selector}`

const selectors = {
  hovered: [when(':hover'), when('[data-hovered]')].join(','),
  pressed: [when(':active'), when('[data-pressed]')].join(','),
  selected: [when('[data-selected]')].join(','),
  focused: [when(':focus'), when('[data-focused]')].join(','),
  disabled: [when(':disabled'), when('[data-disabled]')].join(','),
}

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    userSelect: 'none',

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
          [vars.color.bg]: vars.selectable.color.hovered.bg,
          [vars.color.border]: vars.selectable.color.hovered.border,
          [vars.color.fg]: vars.selectable.color.hovered.fg,
          [vars.color.muted.bg]: vars.selectable.color.hovered.muted.bg,
          [vars.color.muted.border]: vars.selectable.color.hovered.muted.border,
          [vars.color.muted.fg]: vars.selectable.color.hovered.muted.fg,
        },
      },

      [selectors.pressed]: {
        vars: {
          [vars.color.bg]: vars.selectable.color.pressed.bg,
          [vars.color.border]: vars.selectable.color.pressed.border,
          [vars.color.fg]: vars.selectable.color.pressed.fg,
          [vars.color.muted.bg]: vars.selectable.color.pressed.muted.bg,
          [vars.color.muted.border]: vars.selectable.color.pressed.muted.border,
          [vars.color.muted.fg]: vars.selectable.color.pressed.muted.fg,
        },
      },

      [selectors.selected]: {
        vars: {
          [vars.color.bg]: vars.selectable.color.selected.bg,
          [vars.color.border]: vars.selectable.color.selected.border,
          [vars.color.fg]: vars.selectable.color.selected.fg,
          [vars.color.muted.bg]: vars.selectable.color.selected.muted.bg,
          [vars.color.muted.border]: vars.selectable.color.selected.muted.border,
          [vars.color.muted.fg]: vars.selectable.color.selected.muted.fg,
        },
      },

      [selectors.focused]: {
        vars: {
          [vars.color.bg]: vars.selectable.color.selected.bg,
          [vars.color.border]: vars.selectable.color.selected.border,
          [vars.color.fg]: vars.selectable.color.selected.fg,
          [vars.color.muted.bg]: vars.selectable.color.selected.muted.bg,
          [vars.color.muted.border]: vars.selectable.color.selected.muted.border,
          [vars.color.muted.fg]: vars.selectable.color.selected.muted.fg,
        },
      },

      [selectors.disabled]: {
        vars: {
          [vars.color.bg]: vars.selectable.color.disabled.bg,
          [vars.color.border]: vars.selectable.color.disabled.border,
          [vars.color.fg]: vars.selectable.color.disabled.fg,
          [vars.color.muted.bg]: vars.selectable.color.disabled.muted.bg,
          [vars.color.muted.border]: vars.selectable.color.disabled.muted.border,
          [vars.color.muted.fg]: vars.selectable.color.disabled.muted.fg,
        },
      },
    },

    vars: {
      // enabled state
      [vars.color.bg]: vars.selectable.color.enabled.bg,
      [vars.color.border]: vars.selectable.color.enabled.border,
      [vars.color.fg]: vars.selectable.color.enabled.fg,
      [vars.color.muted.bg]: vars.selectable.color.enabled.muted.bg,
      [vars.color.muted.border]: vars.selectable.color.enabled.muted.border,
      [vars.color.muted.fg]: vars.selectable.color.enabled.muted.fg,
    },
  },
  '',
)

export const hotkeys = _style(
  _layers.primitive,
  {
    opacity: 0.5,

    selectors: {
      [`${root}:focus &, ${root}[data-selected] &`]: {
        opacity: 1,
      },
    },
  },
  'hotkeys',
)
