import {_entries} from '../../_entries'
import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {_colorSchemeVars} from '../../system/_colorScheme.css'
import {_coreVars} from '../../system/_core.css'
import {_paletteVars} from '../../system/_palette.css'
import {_tokenTreeToCSSTokens} from '../../system/_tokenTreeToCSSTokens.css'
import {vars} from '../../vars.css'

const when = (selector: string) => `&:is(a, button)${selector}`

const selectors = {
  hovered: [
    when(':hover'),
    when('[data-hovered]'),
    // '&:is(a, button):not(:disabled):not([data-disabled]):hover',
    // '&:is(a, button):not(:disabled):not([data-disabled])[data-hovered]',
  ].join(','),
  pressed: [
    when(':active'),
    when('[data-pressed]'),
    // '&:is(a, button):not(:disabled):not([data-disabled]):active',
    // '&:is(a, button):not(:disabled):not([data-disabled])[data-pressed]',
  ].join(','),
  selected: [
    when('[data-selected]'),
    //
    // '&:is(a, button):not(:disabled):not([data-disabled])[data-selected]',
  ].join(','),
  // focused: [
  //   when(':focus'),
  //   when('[data-focused]'),
  //   // '&:is(a, button):not(:disabled):not([data-disabled])[data-focused]',
  //   // '&:is(a, button):not(:disabled):not([data-disabled]):focus',
  // ].join(','),
  disabled: [
    when(':disabled'),
    when('[data-disabled]'),
    //
    // '&:is(button):disabled',
    // '&:is(a, button)[data-disabled]',
  ].join(','),
}

export const root: string = _style(
  _layers.primitive,
  {
    backgroundColor: vars.color.bg,
    color: vars.color.fg,

    selectors: {
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

      // [selectors.focused]: {
      //   vars: {
      //     [vars.color.bg]: vars.color.card.focused.bg,
      //   },
      // },

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
