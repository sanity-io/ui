import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.checkbox': {
    position: 'relative',

    nest: {
      '&:not([hidden])': {
        display: 'block',
      },
    },
  },

  '.checkbox-input': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    opacity: 0,
    zIndex: 1,
    padding: 0,
    margin: 0,

    nest: {
      '& + span': {
        position: 'relative',
        display: 'block',
        width: vars.input.checkbox.size,
        height: vars.input.checkbox.size,
        boxSizing: 'border-box',
        borderRadius: vars.radius[2],
        lineHeight: 1,
        backgroundColor: vars.color.input.checkbox.bg,
        boxShadow: `inset 0 0 0 1px ${vars.color.input.checkbox.border}`,
        color: vars.color.input.checkbox.fg,

        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[2],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
        },
      },

      '& + span > svg': {
        display: 'block',
        position: 'absolute',
        opacity: 0,
        height: '100%',
        width: '100%',
      },

      '& + span > svg > path': {
        vectorEffect: 'non-scaling-stroke',
        strokeWidth: '1.5px !important',
      },

      // show checkmark when checked
      '&:checked + span > svg:first-child': {
        opacity: 1,
      },

      // show minus when indeterminate
      '&:indeterminate + span > svg:last-child': {
        opacity: 1,
      },

      // checked, not disabled, not invalid
      '&:checked:not(:disabled):not([data-invalid]) + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.solid.default.bg[0],
          [varNames.color.input.checkbox.border]: vars.color.solid.default.bg[0],
          [varNames.color.input.checkbox.fg]: vars.color.solid.default.fg[0],
        },
      },

      // not checked, not invalid, hovered
      '&:not(:checked):not([data-invalid]):hover + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[4],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
        },
      },

      // not checked, not disabled, invalid
      '&:not(:checked):not(:disabled)[data-invalid] + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.critical.bg[1],
          [varNames.color.input.checkbox.border]: vars.color.tinted.critical.border[3],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.critical.fg[4],
        },
      },

      // not checked, invalid, hovered
      '&:not(:checked)[data-invalid]:hover + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.critical.bg[2],
          [varNames.color.input.checkbox.border]: vars.color.tinted.critical.border[4],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.critical.fg[1],
          // [varNames.color.input.checkbox.border]: vars.color.focusRing,
        },
      },

      // checked, not disabled, invalid
      '&:checked:not(:disabled)[data-invalid] + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.solid.critical.bg[0],
          [varNames.color.input.checkbox.border]: vars.color.solid.critical.bg[0],
          [varNames.color.input.checkbox.fg]: vars.color.solid.critical.fg[0],
        },
      },

      // not checked, not indeterminate, read only
      '&:not(:checked):not(:indeterminate)[data-read-only] + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[2],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
        },
      },

      // checked, read only
      '&:checked[data-read-only] + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
        },
      },

      // not checked, focused
      '&:not(:checked):focus:focus-visible + span': {
        vars: {
          [varNames.color.input.checkbox.border]: vars.color.focusRing,
        },
      },

      // checked, focused
      '&:checked:focus:focus-visible + span': {
        vars: {
          [varNames.color.input.checkbox.border]: vars.color.focusRing,
          [varNames.color.input.checkbox.bg]: vars.color.focusRing,
          [varNames.color.input.checkbox.fg]: vars.color.solid.default.fg[0],
        },
      },

      // not checked, disabled
      '&:not(:checked):disabled + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[0],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.border[2],
        },
      },

      // checked, disabled
      '&:checked:disabled + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.border[2],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[2],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.bg[0],
        },
      },

      // indeterminate, disabled
      '&:indeterminate:disabled + span': {
        vars: {
          [varNames.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.input.checkbox.border]: vars.color.tinted.default.border[0],
          [varNames.color.input.checkbox.fg]: vars.color.tinted.default.border[2],
        },
      },
    },
  },
}

export const checkboxStyle: Style = {layers: {primitive}}
