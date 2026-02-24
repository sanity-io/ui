import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'
import {vars} from '../../vars.css'
import {_buttonModeVars} from './buttonMode.css'

const stateSelectors = {
  hovered: '&:not(:disabled):hover, &:not(:disabled)[data-hovered]',
  pressed: '&:not(:disabled):active, &:not(:disabled)[data-pressed]',
  selected: '&:not(:disabled)[data-selected]',
  disabled: '&:disabled, &[data-disabled]',
}

export const root: string = _style(
  _layers.primitive,
  {
    'WebkitFontSmoothing': 'inherit',
    // 'alignItems': 'center',
    'appearance': 'none',
    'font': 'inherit',
    'outline': 'none',
    'userSelect': 'none',
    'textDecoration': 'none',
    'border': 0,
    'boxSizing': 'border-box',
    // 'padding': 0,
    'overflow': 'hidden',
    'margin': 0,
    'textAlign': 'left',
    'position': 'relative',
    'verticalAlign': 'top',
    'boxShadow': _buttonModeVars.boxShadow,
    'backgroundColor': vars.color.bg,
    'color': vars.color.fg,

    '@media': {
      '(hover: hover)': {
        selectors: {
          [stateSelectors.hovered]: {
            vars: {
              [vars.color.bg]: _buttonModeVars.color.state.hovered.bg,
              [vars.color.border]: _buttonModeVars.color.state.hovered.border,
              [vars.color.fg]: _buttonModeVars.color.state.hovered.fg,
              [vars.color.muted.bg]: _buttonModeVars.color.state.hovered.muted.bg,
              [vars.color.muted.border]: _buttonModeVars.color.state.hovered.muted.border,
              [vars.color.muted.fg]: _buttonModeVars.color.state.hovered.muted.fg,
            },
          },

          [stateSelectors.pressed]: {
            vars: {
              [vars.color.bg]: _buttonModeVars.color.state.pressed.bg,
              [vars.color.border]: _buttonModeVars.color.state.pressed.border,
              [vars.color.fg]: _buttonModeVars.color.state.pressed.fg,
              [vars.color.muted.bg]: _buttonModeVars.color.state.pressed.muted.bg,
              [vars.color.muted.border]: _buttonModeVars.color.state.pressed.muted.border,
              [vars.color.muted.fg]: _buttonModeVars.color.state.pressed.muted.fg,
            },
          },

          [stateSelectors.selected]: {
            vars: {
              [vars.color.bg]: _buttonModeVars.color.state.selected.bg,
              [vars.color.border]: _buttonModeVars.color.state.selected.border,
              [vars.color.fg]: _buttonModeVars.color.state.selected.fg,
              [vars.color.muted.bg]: _buttonModeVars.color.state.selected.muted.bg,
              [vars.color.muted.border]: _buttonModeVars.color.state.selected.muted.border,
              [vars.color.muted.fg]: _buttonModeVars.color.state.selected.muted.fg,
            },
          },

          [stateSelectors.disabled]: {
            opacity: 0.5,
            vars: {
              [vars.color.bg]: _buttonModeVars.color.state.disabled.bg,
              [vars.color.border]: _buttonModeVars.color.state.disabled.border,
              [vars.color.fg]: _buttonModeVars.color.state.disabled.fg,
              [vars.color.muted.bg]: _buttonModeVars.color.state.disabled.muted.bg,
              [vars.color.muted.border]: _buttonModeVars.color.state.disabled.muted.border,
              [vars.color.muted.fg]: _buttonModeVars.color.state.disabled.muted.fg,
            },
          },
        },
      },
    },

    'selectors': {
      '&::-moz-focus-inner': {
        border: 0,
        padding: 0,
      },

      '&:focus': {
        boxShadow: `${_buttonModeVars.boxShadow}, ${vars.button.focusRing}`,
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: _buttonModeVars.boxShadow,
      },
    },

    'vars': {
      [vars.color.bg]: _buttonModeVars.color.state.enabled.bg,
      [vars.color.border]: _buttonModeVars.color.state.enabled.border,
      [vars.color.fg]: _buttonModeVars.color.state.enabled.fg,
      [vars.color.muted.bg]: _buttonModeVars.color.state.enabled.muted.bg,
      [vars.color.muted.border]: _buttonModeVars.color.state.enabled.muted.border,
      [vars.color.muted.fg]: _buttonModeVars.color.state.enabled.muted.fg,
    },
  },
  '',
)

export const loadingBox: string = _style(
  _layers.primitive,
  {
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
  'loading',
)
