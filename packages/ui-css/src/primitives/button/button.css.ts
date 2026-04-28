import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'
import {buttonModeVars} from '../../vars/component/button/mode.css'
import {buttonSlotVars} from '../../vars/component/button/slots.css'
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
    'boxShadow': buttonModeVars.button.boxShadow,
    'backgroundColor': vars.color.bg,

    '@media': {
      '(hover: hover)': {
        selectors: {
          [stateSelectors.hovered]: {
            vars: {
              [vars.color.bg]: buttonModeVars.button.color.hovered.bg,
              [vars.color.border]: buttonModeVars.button.color.hovered.border,
              [vars.color.muted.border]: buttonModeVars.button.color.hovered.muted.border,

              // button slot overrides
              [buttonSlotVars.button.color.muted.border]:
                buttonModeVars.button.color.hovered.muted.border,

              // font slot overrides
              [_fontVars.color.fg]: buttonModeVars.button.color.hovered.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.button.color.hovered.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.button.color.hovered.muted.fg,
            },
          },

          [stateSelectors.pressed]: {
            vars: {
              [vars.color.bg]: buttonModeVars.button.color.pressed.bg,
              [vars.color.border]: buttonModeVars.button.color.pressed.border,
              [vars.color.muted.border]: buttonModeVars.button.color.pressed.muted.border,

              // button slot overrides
              [buttonSlotVars.button.color.muted.border]:
                buttonModeVars.button.color.pressed.muted.border,

              // font slot overrides
              [_fontVars.color.fg]: buttonModeVars.button.color.pressed.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.button.color.pressed.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.button.color.pressed.muted.fg,
            },
          },

          [stateSelectors.disabled]: {
            opacity: 0.5,
            vars: {
              [vars.color.bg]: buttonModeVars.button.color.disabled.bg,
              [vars.color.border]: buttonModeVars.button.color.disabled.border,
              [vars.color.muted.border]: buttonModeVars.button.color.disabled.muted.border,

              // button slot overrides
              [buttonSlotVars.button.color.muted.border]:
                buttonModeVars.button.color.disabled.muted.border,

              // font slot overrides
              [_fontVars.color.fg]: buttonModeVars.button.color.disabled.fg,
              [_fontVars.color.muted.bg]: buttonModeVars.button.color.disabled.muted.bg,
              [_fontVars.color.muted.fg]: buttonModeVars.button.color.disabled.muted.fg,
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
        boxShadow: `${buttonModeVars.button.boxShadow}, ${vars.button.focusRing}`,
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: buttonModeVars.button.boxShadow,
      },
    },

    'vars': {
      [vars.color.bg]: buttonModeVars.button.color.enabled.bg,
      [vars.color.border]: buttonModeVars.button.color.enabled.border,
      [vars.color.muted.border]: buttonModeVars.button.color.enabled.muted.border,

      // button slot overrides
      [buttonSlotVars.button.color.muted.border]: buttonModeVars.button.color.enabled.muted.border,

      // font slot overrides
      [_fontVars.color.fg]: buttonModeVars.button.color.enabled.fg,
      [_fontVars.color.muted.bg]: buttonModeVars.button.color.enabled.muted.bg,
      [_fontVars.color.muted.fg]: buttonModeVars.button.color.enabled.muted.fg,
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
