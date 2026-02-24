import {system} from '@sanity/ui-tokens/system'
import {createTheme} from '@vanilla-extract/css'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {_tokenTreeToCSSTokens} from '../../system/_tokenTreeToCSSTokens.css'
import {colorVars} from '../../system/color.css'
import {vars} from '../../vars.css'

const collection = system.collections.selectable
const selectableTokens = collection.modes.default[collection.namespace]

export const [selectableVarsClassName, selectableVars] = createTheme(
  {
    '@layer': _layers.vars,
    ..._tokenTreeToCSSTokens(selectableTokens, {
      color: colorVars,
    }),
  },
  'vars',
)

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
  focused: [
    when(':focus'),
    when('[data-focused]'),
    // '&:is(a, button):not(:disabled):not([data-disabled])[data-focused]',
    // '&:is(a, button):not(:disabled):not([data-disabled]):focus',
  ].join(','),
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
          [vars.color.bg]: selectableVars.color.state.hovered.bg,
          [vars.color.border]: selectableVars.color.state.hovered.border,
          [vars.color.fg]: selectableVars.color.state.hovered.fg,
          [vars.color.muted.bg]: selectableVars.color.state.hovered.muted.bg,
          [vars.color.muted.border]: selectableVars.color.state.hovered.muted.border,
          [vars.color.muted.fg]: selectableVars.color.state.hovered.muted.fg,
        },
      },

      [selectors.pressed]: {
        vars: {
          [vars.color.bg]: selectableVars.color.state.pressed.bg,
          [vars.color.border]: selectableVars.color.state.pressed.border,
          [vars.color.fg]: selectableVars.color.state.pressed.fg,
          [vars.color.muted.bg]: selectableVars.color.state.pressed.muted.bg,
          [vars.color.muted.border]: selectableVars.color.state.pressed.muted.border,
          [vars.color.muted.fg]: selectableVars.color.state.pressed.muted.fg,
        },
      },

      [selectors.selected]: {
        vars: {
          [vars.color.bg]: selectableVars.color.state.selected.bg,
          [vars.color.border]: selectableVars.color.state.selected.border,
          [vars.color.fg]: selectableVars.color.state.selected.fg,
          [vars.color.muted.bg]: selectableVars.color.state.selected.muted.bg,
          [vars.color.muted.border]: selectableVars.color.state.selected.muted.border,
          [vars.color.muted.fg]: selectableVars.color.state.selected.muted.fg,
        },
      },

      [selectors.focused]: {
        vars: {
          [vars.color.bg]: selectableVars.color.state.selected.bg,
          [vars.color.border]: selectableVars.color.state.selected.border,
          [vars.color.fg]: selectableVars.color.state.selected.fg,
          [vars.color.muted.bg]: selectableVars.color.state.selected.muted.bg,
          [vars.color.muted.border]: selectableVars.color.state.selected.muted.border,
          [vars.color.muted.fg]: selectableVars.color.state.selected.muted.fg,
        },
      },

      [selectors.disabled]: {
        vars: {
          [vars.color.bg]: selectableVars.color.state.disabled.bg,
          [vars.color.border]: selectableVars.color.state.disabled.border,
          [vars.color.fg]: selectableVars.color.state.disabled.fg,
          [vars.color.muted.bg]: selectableVars.color.state.disabled.muted.bg,
          [vars.color.muted.border]: selectableVars.color.state.disabled.muted.border,
          [vars.color.muted.fg]: selectableVars.color.state.disabled.muted.fg,
        },
      },
    },

    vars: {
      // enabled state
      [vars.color.bg]: selectableVars.color.state.enabled.bg,
      [vars.color.border]: selectableVars.color.state.enabled.border,
      [vars.color.fg]: selectableVars.color.state.enabled.fg,
      [vars.color.muted.bg]: selectableVars.color.state.enabled.muted.bg,
      [vars.color.muted.border]: selectableVars.color.state.enabled.muted.border,
      [vars.color.muted.fg]: selectableVars.color.state.enabled.muted.fg,
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
