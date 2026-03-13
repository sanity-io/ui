import {selectableTokens} from '@sanity/ui-tokens/selectable'
import {createTheme} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {_toCSSTokens} from '../../lib/css-tokens/_toCSSTokens'
import type {CSSVars} from '../../lib/css-tokens/types'
import {vars} from '../../vars'
import {colorVars} from '../../vars/color.css'

const _vars = {...colorVars}
const _cssTokens = _toCSSTokens(selectableTokens, _vars)
const _theme = createTheme({'@layer': _layers.vars, ..._cssTokens}, 'vars')

export const selectableVarsClassName = _theme[0]
export const selectableVars: CSSVars<typeof _cssTokens> = _theme[1]

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
          [vars.color.bg]: selectableVars.selectable.color.state.hovered.bg,
          [vars.color.border]: selectableVars.selectable.color.state.hovered.border,
          [vars.color.fg]: selectableVars.selectable.color.state.hovered.fg,
          [vars.color.muted.bg]: selectableVars.selectable.color.state.hovered.muted.bg,
          [vars.color.muted.border]: selectableVars.selectable.color.state.hovered.muted.border,
          [vars.color.muted.fg]: selectableVars.selectable.color.state.hovered.muted.fg,
        },
      },

      [selectors.pressed]: {
        vars: {
          [vars.color.bg]: selectableVars.selectable.color.state.pressed.bg,
          [vars.color.border]: selectableVars.selectable.color.state.pressed.border,
          [vars.color.fg]: selectableVars.selectable.color.state.pressed.fg,
          [vars.color.muted.bg]: selectableVars.selectable.color.state.pressed.muted.bg,
          [vars.color.muted.border]: selectableVars.selectable.color.state.pressed.muted.border,
          [vars.color.muted.fg]: selectableVars.selectable.color.state.pressed.muted.fg,
        },
      },

      [selectors.selected]: {
        vars: {
          [vars.color.bg]: selectableVars.selectable.color.state.selected.bg,
          [vars.color.border]: selectableVars.selectable.color.state.selected.border,
          [vars.color.fg]: selectableVars.selectable.color.state.selected.fg,
          [vars.color.muted.bg]: selectableVars.selectable.color.state.selected.muted.bg,
          [vars.color.muted.border]: selectableVars.selectable.color.state.selected.muted.border,
          [vars.color.muted.fg]: selectableVars.selectable.color.state.selected.muted.fg,
        },
      },

      [selectors.focused]: {
        vars: {
          [vars.color.bg]: selectableVars.selectable.color.state.selected.bg,
          [vars.color.border]: selectableVars.selectable.color.state.selected.border,
          [vars.color.fg]: selectableVars.selectable.color.state.selected.fg,
          [vars.color.muted.bg]: selectableVars.selectable.color.state.selected.muted.bg,
          [vars.color.muted.border]: selectableVars.selectable.color.state.selected.muted.border,
          [vars.color.muted.fg]: selectableVars.selectable.color.state.selected.muted.fg,
        },
      },

      [selectors.disabled]: {
        vars: {
          [vars.color.bg]: selectableVars.selectable.color.state.disabled.bg,
          [vars.color.border]: selectableVars.selectable.color.state.disabled.border,
          [vars.color.fg]: selectableVars.selectable.color.state.disabled.fg,
          [vars.color.muted.bg]: selectableVars.selectable.color.state.disabled.muted.bg,
          [vars.color.muted.border]: selectableVars.selectable.color.state.disabled.muted.border,
          [vars.color.muted.fg]: selectableVars.selectable.color.state.disabled.muted.fg,
        },
      },
    },

    vars: {
      // enabled state
      [vars.color.bg]: selectableVars.selectable.color.state.enabled.bg,
      [vars.color.border]: selectableVars.selectable.color.state.enabled.border,
      [vars.color.fg]: selectableVars.selectable.color.state.enabled.fg,
      [vars.color.muted.bg]: selectableVars.selectable.color.state.enabled.muted.bg,
      [vars.color.muted.border]: selectableVars.selectable.color.state.enabled.muted.border,
      [vars.color.muted.fg]: selectableVars.selectable.color.state.enabled.muted.fg,
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
