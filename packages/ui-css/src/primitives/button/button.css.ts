import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

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
    'boxShadow': vars.button.boxShadow,
    'backgroundColor': vars.button.color.bg,

    '@media': {
      '(hover: hover)': {
        selectors: {
          [stateSelectors.hovered]: {
            vars: {
              // button color overrides
              [vars.button.color.bg]: vars.button.color.hovered.bg,
              [vars.button.color.border]: vars.button.color.hovered.border,
              [vars.button.color.fg]: vars.button.color.hovered.fg,
              [vars.button.color.muted.bg]: vars.button.color.hovered.muted.bg,
              [vars.button.color.muted.border]: vars.button.color.hovered.muted.border,
              [vars.button.color.muted.fg]: vars.button.color.hovered.muted.fg,

              // core color overrides
              [vars.color.bg]: vars.button.color.bg,
              [vars.color.border]: vars.button.color.border,
              [vars.color.fg]: vars.button.color.fg,
              [vars.color.muted.bg]: vars.button.color.muted.bg,
              [vars.color.muted.border]: vars.button.color.muted.border,
              [vars.color.muted.fg]: vars.button.color.muted.fg,

              // font slot overrides
              [vars.font.color.fg]: vars.button.color.fg,
              [vars.font.color.muted.bg]: vars.button.color.muted.bg,
              [vars.font.color.muted.fg]: vars.button.color.muted.fg,
            },
          },

          [stateSelectors.pressed]: {
            vars: {
              // button color overrides
              [vars.button.color.bg]: vars.button.color.pressed.bg,
              [vars.button.color.border]: vars.button.color.pressed.border,
              [vars.button.color.fg]: vars.button.color.pressed.fg,
              [vars.button.color.muted.bg]: vars.button.color.pressed.muted.bg,
              [vars.button.color.muted.border]: vars.button.color.pressed.muted.border,
              [vars.button.color.muted.fg]: vars.button.color.pressed.muted.fg,

              // core color overrides
              [vars.color.bg]: vars.button.color.bg,
              [vars.color.border]: vars.button.color.border,
              [vars.color.fg]: vars.button.color.fg,
              [vars.color.muted.bg]: vars.button.color.muted.bg,
              [vars.color.muted.border]: vars.button.color.muted.border,
              [vars.color.muted.fg]: vars.button.color.muted.fg,

              // font slot overrides
              [vars.font.color.fg]: vars.button.color.fg,
              [vars.font.color.muted.bg]: vars.button.color.muted.bg,
              [vars.font.color.muted.fg]: vars.button.color.muted.fg,
            },
          },

          [stateSelectors.disabled]: {
            opacity: 0.5,
            vars: {
              // button color overrides
              [vars.button.color.bg]: vars.button.color.disabled.bg,
              [vars.button.color.border]: vars.button.color.disabled.border,
              [vars.button.color.fg]: vars.button.color.disabled.fg,
              [vars.button.color.muted.bg]: vars.button.color.disabled.muted.bg,
              [vars.button.color.muted.border]: vars.button.color.disabled.muted.border,
              [vars.button.color.muted.fg]: vars.button.color.disabled.muted.fg,

              // core color overrides
              [vars.color.bg]: vars.button.color.bg,
              [vars.color.border]: vars.button.color.border,
              [vars.color.fg]: vars.button.color.fg,
              [vars.color.muted.bg]: vars.button.color.muted.bg,
              [vars.color.muted.border]: vars.button.color.muted.border,
              [vars.color.muted.fg]: vars.button.color.muted.fg,

              // font slot overrides
              [vars.font.color.fg]: vars.button.color.fg,
              [vars.font.color.muted.bg]: vars.button.color.muted.bg,
              [vars.font.color.muted.fg]: vars.button.color.muted.fg,
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
        boxShadow: `${vars.button.boxShadow}, ${vars.button.focusRing}`,
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: vars.button.boxShadow,
      },
    },

    'vars': {
      // button color overrides
      [vars.button.color.bg]: vars.button.color.enabled.bg,
      [vars.button.color.border]: vars.button.color.enabled.border,
      [vars.button.color.fg]: vars.button.color.enabled.fg,
      [vars.button.color.muted.bg]: vars.button.color.enabled.muted.bg,
      [vars.button.color.muted.border]: vars.button.color.enabled.muted.border,
      [vars.button.color.muted.fg]: vars.button.color.enabled.muted.fg,

      // core color overrides
      [vars.color.bg]: vars.button.color.bg,
      [vars.color.border]: vars.button.color.border,
      [vars.color.fg]: vars.button.color.fg,
      [vars.color.muted.bg]: vars.button.color.muted.bg,
      [vars.color.muted.border]: vars.button.color.muted.border,
      [vars.color.muted.fg]: vars.button.color.muted.fg,

      // font slot overrides
      [vars.font.color.fg]: vars.button.color.fg,
      [vars.font.color.muted.bg]: vars.button.color.muted.bg,
      [vars.font.color.muted.fg]: vars.button.color.muted.fg,
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
