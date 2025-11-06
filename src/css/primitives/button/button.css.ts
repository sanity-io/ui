import {AVATAR_COLORS, type ButtonMode, ELEMENT_TONES, type ElementTone} from '@sanity/ui/theme'

import {_fromEntries} from '../../_fromEntries'
import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  WebkitFontSmoothing: 'inherit',
  alignItems: 'center',
  appearance: 'none',
  font: 'inherit',
  outline: 'none',
  userSelect: 'none',
  textDecoration: 'none',
  border: 0,
  boxSizing: 'border-box',
  padding: 0,
  overflow: 'hidden',
  margin: 0,
  textAlign: 'left',
  position: 'relative',
  verticalAlign: 'top',
  backgroundColor: vars.color.bg,
  color: vars.color.fg,

  selectors: {
    '&::-moz-focus-inner': {
      border: 0,
      padding: 0,
    },

    '&:focus': {
      outline: `${vars.button.focusRing.width} solid ${vars.color.focusRing}`,
      outlineOffset: vars.button.focusRing.offset,
    },

    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
  },
})

export const modes: Record<ButtonMode, string> = {
  default: _style(layers.primitives, {}),
  ghost: _style(layers.primitives, {boxShadow: vars.button.boxShadow}),
  bleed: _style(layers.primitives, {}),
}

export const loadingBox: string = _style(layers.primitives, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.color.bg,
  borderRadius: 'inherit',
  zIndex: 1,
  opacity: 0.8,
})

export const tones: Record<ElementTone, string> = {
  ..._fromEntries(
    ELEMENT_TONES.map((t) => {
      const solid = vars.color.solid[t]
      const tinted = vars.color.tinted[t]

      const stateVars = {
        default: {
          enabled: {
            [vars.color.bg]: solid.bg[0],
            [vars.color.border]: solid.border[1],
            [vars.color.code.bg]: solid.bg[1],
            [vars.color.code.fg]: solid.fg[4],
            [vars.color.fg]: solid.fg[0],
            [vars.color.muted.bg]: solid.bg[1],
            [vars.color.muted.fg]: solid.fg[4],
            [vars.button.boxShadow]: 'none',
          },

          hovered: {
            [vars.color.bg]: solid.bg[1],
            [vars.color.border]: solid.border[2],
            [vars.color.code.bg]: solid.bg[2],
            [vars.color.code.fg]: solid.fg[4],
            [vars.color.fg]: solid.fg[0],
            [vars.color.muted.bg]: solid.bg[2],
            [vars.color.muted.fg]: solid.fg[4],
          },

          // NOTE: also used for `selected` state
          pressed: {
            [vars.color.bg]: solid.bg[2],
            [vars.color.border]: solid.border[3],
            [vars.color.code.bg]: solid.bg[3],
            [vars.color.code.fg]: solid.fg[4],
            [vars.color.fg]: solid.fg[0],
            [vars.color.muted.bg]: solid.bg[3],
            [vars.color.muted.fg]: solid.fg[4],
          },

          disabled: {
            ..._fromEntries(
              AVATAR_COLORS.map((c) => [vars.color.avatar[c].bg, vars.color.tinted.default.bg[3]]),
            ),

            [vars.color.bg]: vars.color.tinted.default.bg[1],
            [vars.color.border]: vars.color.tinted.default.border[1],
            [vars.color.code.bg]: vars.color.tinted.default.bg[2],
            [vars.color.code.fg]: vars.color.tinted.default.border[4],
            [vars.color.fg]: vars.color.tinted.default.border[4],
            [vars.color.muted.bg]: vars.color.tinted.default.bg[2],
            [vars.color.muted.fg]: vars.color.tinted.default.border[4],
          },
        },

        ghost: {
          enabled: {
            [vars.color.bg]: `color-mix(in srgb, transparent, ${tinted.bg[1]} 50%)`,
            [vars.color.border]: tinted.border[0],
            [vars.color.fg]: tinted.fg[2],
            [vars.color.code.bg]: tinted.bg[2],
            [vars.color.code.fg]: tinted.fg[4],
            [vars.color.muted.bg]: tinted.bg[2],
            [vars.color.muted.fg]: tinted.fg[4],
            [vars.button.boxShadow]: `inset 0 0 0 ${vars.button.border.width} ${vars.color.border}`,
          },

          hovered: {
            [vars.color.bg]: tinted.bg[1],
            [vars.color.border]: tinted.border[1],
            [vars.color.code.bg]: tinted.bg[3],
            [vars.color.code.fg]: tinted.fg[3],
            [vars.color.fg]: tinted.fg[1],
            [vars.color.muted.bg]: tinted.bg[3],
            [vars.color.muted.fg]: tinted.fg[3],
          },

          // NOTE: also used for `selected` state
          pressed: {
            [vars.color.bg]: tinted.bg[2],
            [vars.color.border]: tinted.border[2],
            [vars.color.code.bg]: tinted.bg[4],
            [vars.color.code.fg]: tinted.fg[3],
            [vars.color.fg]: tinted.fg[1],
            [vars.color.muted.bg]: tinted.bg[4],
            [vars.color.muted.fg]: tinted.fg[3],
            [vars.button.boxShadow]: `inset 0 0 0 ${vars.button.border.width} ${vars.color.border}`,
          },

          disabled: {
            ..._fromEntries(
              AVATAR_COLORS.map((c) => [vars.color.avatar[c].bg, vars.color.tinted.default.bg[2]]),
            ),

            [vars.color.bg]: vars.color.tinted.default.bg[0],
            [vars.color.border]: vars.color.tinted.default.border[0],
            [vars.color.code.bg]: vars.color.tinted.default.bg[1],
            [vars.color.code.fg]: vars.color.tinted.default.border[3],
            [vars.color.fg]: vars.color.tinted.default.border[4],
            [vars.color.muted.bg]: vars.color.tinted.default.bg[1],
            [vars.color.muted.fg]: vars.color.tinted.default.border[3],
          },
        },

        bleed: {
          enabled: {
            [vars.color.bg]: tinted.bg[0],
            [vars.color.border]: tinted.border[1],
            [vars.color.fg]: tinted.fg[2],
            [vars.color.muted.bg]: tinted.bg[1],
            [vars.color.muted.fg]: tinted.fg[4],
            [vars.button.boxShadow]: 'none',
          },

          hovered: {
            [vars.color.bg]: tinted.bg[1],
            [vars.color.border]: tinted.border[2],
            [vars.color.fg]: tinted.fg[1],
            [vars.color.muted.bg]: tinted.bg[2],
            [vars.color.muted.fg]: tinted.fg[3],
          },

          // NOTE: also used for `selected` state
          pressed: {
            [vars.color.bg]: tinted.bg[2],
            [vars.color.border]: tinted.border[3],
            [vars.color.fg]: tinted.fg[1],
            [vars.color.muted.bg]: tinted.bg[3],
            [vars.color.muted.fg]: tinted.fg[3],
          },

          disabled: {
            ..._fromEntries(
              AVATAR_COLORS.map((c) => [vars.color.avatar[c].bg, vars.color.tinted.default.bg[2]]),
            ),

            [vars.color.bg]: vars.color.tinted.default.bg[0],
            [vars.color.border]: vars.color.tinted.default.border[0],
            [vars.color.code.bg]: vars.color.tinted.default.bg[1],
            [vars.color.code.fg]: vars.color.tinted.default.border[3],
            [vars.color.fg]: vars.color.tinted.default.border[4],
            [vars.color.muted.bg]: vars.color.tinted.default.bg[1],
            [vars.color.muted.fg]: vars.color.tinted.default.border[3],
          },
        },
      }

      return [
        t,
        _style(layers.primitives, {
          '@media': {
            '(hover: hover)': {
              selectors: {
                [[
                  `&.${modes.default}`,
                  ':not(:active)',
                  ':not(:focus)',
                  ':not(:disabled)',
                  ':not([aria-pressed="true"])',
                  ':not([data-pressed])',
                  ':not([data-focused])',
                  ':not([data-selected])',
                  ':not([data-disabled])',
                  ':hover',
                ].join('')]: {
                  vars: stateVars.default.hovered,
                },

                [[
                  `&.${modes.ghost}`,
                  ':not(:active)',
                  ':not(:focus)',
                  ':not(:disabled)',
                  ':not([aria-pressed="true"])',
                  ':not([data-pressed])',
                  ':not([data-focused])',
                  ':not([data-selected])',
                  ':not([data-disabled])',
                  ':hover',
                ].join('')]: {
                  vars: stateVars.ghost.hovered,
                },

                [[
                  `&.${modes.bleed}`,
                  ':not(:active)',
                  ':not(:focus)',
                  ':not(:disabled)',
                  ':not([aria-pressed="true"])',
                  ':not([data-pressed])',
                  ':not([data-focused])',
                  ':not([data-selected])',
                  ':not([data-disabled])',
                  ':hover',
                ].join('')]: {
                  vars: stateVars.bleed.hovered,
                },
              },
            },
          },

          'selectors': {
            // default - enabled
            [`&.${modes.default}:not([data-disabled])`]: {
              vars: stateVars.default.enabled,
            },

            // default - hovered
            [[
              // `&.${modes.default}:not([data-disabled]):hover`,
              `&.${modes.default}:not([data-disabled])[data-hovered]`,
            ].join(',')]: {
              vars: stateVars.default.hovered,
            },

            // default - pressed
            // default - selected
            [[
              `&.${modes.default}:not([data-disabled]):active`,
              `&.${modes.default}:not([data-disabled])[aria-pressed="true"]`,
              `&.${modes.default}:not([data-disabled])[data-pressed]`,
              `&.${modes.default}:not([data-disabled])[data-selected]`,
            ].join(',')]: {
              vars: stateVars.default.pressed,
            },

            // default - disabled
            [[`&.${modes.default}:disabled`, `&.${modes.default}[data-disabled]`].join(',')]: {
              vars: stateVars.default.disabled,
            },

            // ghost - enabled
            [`&.${modes.ghost}:not([data-disabled])`]: {
              vars: stateVars.ghost.enabled,
            },

            // ghost - hovered
            [[
              // `&.${modes.ghost}:not([data-disabled]):hover`,
              `&.${modes.ghost}:not([data-disabled])[data-hovered]`,
            ].join(',')]: {
              vars: stateVars.ghost.hovered,
            },

            // ghost - pressed
            // ghost - selected
            [[
              `&.${modes.ghost}:not([data-disabled]):active`,
              `&.${modes.ghost}:not([data-disabled])[aria-pressed="true"]`,
              `&.${modes.ghost}:not([data-disabled])[data-pressed]`,
              `&.${modes.ghost}:not([data-disabled])[data-selected]`,
            ].join(',')]: {
              vars: stateVars.ghost.pressed,
            },

            // ghost - disabled
            [[`&.${modes.ghost}:disabled`, `&.${modes.ghost}[data-disabled]`].join(',')]: {
              vars: stateVars.ghost.disabled,
            },

            // bleed - enabled
            [`&.${modes.bleed}:not([data-disabled])`]: {
              vars: stateVars.bleed.enabled,
            },

            // bleed - hovered
            [[
              // `&.${modes.bleed}:not([data-disabled]):hover`,
              `&.${modes.bleed}:not([data-disabled])[data-hovered]`,
            ].join(',')]: {
              vars: stateVars.bleed.hovered,
            },

            // bleed - pressed
            // bleed - selected
            [[
              `&.${modes.bleed}:not([data-disabled]):active`,
              `&.${modes.bleed}:not([data-disabled])[aria-pressed="true"]`,
              `&.${modes.bleed}:not([data-disabled])[data-pressed]`,
              `&.${modes.bleed}:not([data-disabled])[data-selected]`,
            ].join(',')]: {
              vars: stateVars.bleed.pressed,
            },

            // bleed - disabled
            [[`&.${modes.bleed}:disabled`, `&.${modes.bleed}[data-disabled]`].join(',')]: {
              vars: stateVars.bleed.disabled,
            },
          },
        }),
      ]
    }),
  ),
}
