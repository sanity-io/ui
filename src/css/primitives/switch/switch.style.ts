import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.switch': {},

  '.switch-element': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    outline: 'none',
    padding: 0,
    margin: 0,

    // place the input element on top of the representation element
    zIndex: 1,
  },

  '.switch-presentation': {
    vars: {
      [varNames.color.input.switch.bg]: vars.color.tinted.default.border[2],
      [varNames.color.input.switch.fg]: vars.color.tinted.default.bg[0],
      [varNames.input.switch.thumb.offset]: '0',
      [varNames.input.switch.thumb.size]:
        `calc(${vars.input.switch.height} - ${vars.input.switch.padding} * 2)`,
    },
    display: 'block',
    position: 'relative',
    width: vars.input.switch.width,
    height: vars.input.switch.height,
    borderRadius: `calc(${vars.input.switch.height} / 2)`,
    outlineOffset: vars.input.switch.focusRing.offset,

    // Make sure it’s not possible to interact with the presentation element
    pointerEvents: 'none',

    nest: {
      'input:not(:checked):hover + &': {
        vars: {
          [varNames.color.input.switch.bg]: vars.color.tinted.default.border[4],
        },
      },

      'input:checked + &': {
        vars: {
          [varNames.color.input.switch.bg]: vars.color.solid.default.bg[0],
          [varNames.color.input.switch.fg]: vars.color.solid.default.fg[0],
          [varNames.input.switch.thumb.offset]:
            `calc(${vars.input.switch.width} - (${vars.input.switch.padding} * 2) - ${vars.input.switch.thumb.size})`,
        },
      },

      '[data-indeterminate] > input + &': {
        vars: {
          [varNames.input.switch.thumb.offset]:
            `calc(${vars.input.switch.width} / 2 - ${vars.input.switch.thumb.size} / 2 - ${vars.input.switch.padding})`,
        },
      },

      'input:focus + &': {
        outline: `${vars.input.switch.focusRing.width} solid ${vars.color.focusRing}`,
      },

      'input:focus:not(:focus-visible) + &': {
        outline: 'none',
      },
    },
  },

  '.switch-track': {
    display: 'block',
    backgroundColor: vars.color.input.switch.bg,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    transition: `box-shadow, background-color ${vars.input.switch.transitionDurationMs} ${vars.input.switch.transitionTimingFunction}`,
  },

  '.switch-thumb': {
    display: 'block',
    position: 'absolute',
    left: vars.input.switch.padding,
    top: vars.input.switch.padding,
    width: vars.input.switch.thumb.size,
    height: vars.input.switch.thumb.size,
    backgroundColor: vars.color.input.switch.fg,
    borderRadius: '9999px',
    boxShadow: `0 0 0 0.5px ${vars.color.shadow.umbra}, 0 0.5px 2px 0.5px ${vars.color.shadow.umbra}`,
    transform: `translate3d(${vars.input.switch.thumb.offset}, 0, 0)`,
    transition: `transform ${vars.input.switch.transitionDurationMs} ${vars.input.switch.transitionTimingFunction}`,
  },
}

export const switchStyle: Style = {layers: {primitive}}
