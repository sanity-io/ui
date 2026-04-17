import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'
import {buttonModeVars} from '../../vars/component/button/mode.css'
import {_fontVars} from '../_font/_font.css'

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
    'appearance': 'none',
    'font': 'inherit',
    'outline': 'none',
    'userSelect': 'none',
    'textDecoration': 'none',
    'border': 0,
    'boxSizing': 'border-box',
    'overflow': 'hidden',
    'margin': 0,
    'textAlign': 'left',
    'position': 'relative',
    'verticalAlign': 'top',
    'boxShadow': buttonModeVars.buttonMode.boxShadow,
    'backgroundColor': vars.color.bg,

    '@media': {
      '(hover: hover)': {
        selectors: {
          [stateSelectors.hovered]: {
            vars: {
              [vars.color.bg]: buttonModeVars.buttonMode.color.state.hovered.bg,
              [vars.color.border]: buttonModeVars.buttonMode.color.state.hovered.border,
              [vars.color.muted.border]: buttonModeVars.buttonMode.color.state.hovered.muted.border,

              [_fontVars.color.fg]: buttonModeVars.buttonMode.color.state.hovered.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.buttonMode.color.state.hovered.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.buttonMode.color.state.hovered.muted.fg,
            },
          },

          [stateSelectors.pressed]: {
            vars: {
              [vars.color.bg]: buttonModeVars.buttonMode.color.state.pressed.bg,
              [vars.color.border]: buttonModeVars.buttonMode.color.state.pressed.border,
              [vars.color.muted.border]: buttonModeVars.buttonMode.color.state.pressed.muted.border,

              [_fontVars.color.fg]: buttonModeVars.buttonMode.color.state.pressed.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.buttonMode.color.state.pressed.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.buttonMode.color.state.pressed.muted.fg,
            },
          },

          [stateSelectors.selected]: {
            vars: {
              [vars.color.bg]: buttonModeVars.buttonMode.color.state.selected.bg,
              [vars.color.border]: buttonModeVars.buttonMode.color.state.selected.border,
              [vars.color.muted.border]:
                buttonModeVars.buttonMode.color.state.selected.muted.border,

              [_fontVars.color.fg]: buttonModeVars.buttonMode.color.state.selected.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.buttonMode.color.state.selected.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.buttonMode.color.state.selected.muted.fg,
            },
          },

          [stateSelectors.disabled]: {
            opacity: 0.5,
            vars: {
              [vars.color.bg]: buttonModeVars.buttonMode.color.state.disabled.bg,
              [vars.color.border]: buttonModeVars.buttonMode.color.state.disabled.border,
              [vars.color.muted.border]:
                buttonModeVars.buttonMode.color.state.disabled.muted.border,

              [_fontVars.color.fg]: buttonModeVars.buttonMode.color.state.disabled.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.buttonMode.color.state.disabled.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.buttonMode.color.state.disabled.muted.fg,
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
        boxShadow: `${buttonModeVars.buttonMode.boxShadow}, ${vars.button.focusRing}`,
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: buttonModeVars.buttonMode.boxShadow,
      },
    },

    'vars': {
      [vars.color.bg]: buttonModeVars.buttonMode.color.state.enabled.bg,
      [vars.color.border]: buttonModeVars.buttonMode.color.state.enabled.border,
      [vars.color.muted.border]: buttonModeVars.buttonMode.color.state.enabled.muted.border,

      [_fontVars.color.fg]: buttonModeVars.buttonMode.color.state.enabled.fg,
      [_fontVars.color.muted.bg]: buttonModeVars.buttonMode.color.state.enabled.muted.bg,
      [_fontVars.color.muted.fg]: buttonModeVars.buttonMode.color.state.enabled.muted.fg,
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
