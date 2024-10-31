import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.radio': {
    position: 'relative',

    nest: {
      '&:not([hidden])': {
        display: 'inline-block',
      },

      '& input': {
        appearance: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
        height: '100%',
        width: '100%',
        outline: 'none',
        zIndex: '1',
        padding: '0',
        margin: '0',
        borderRadius: '9999px',
        border: 'none',
      },

      // enabled
      '& > input + span': {
        display: 'block',
        position: 'relative',
        width: vars.input.radio.size,
        height: vars.input.radio.size,
        borderRadius: '9999px',
        backgroundColor: vars.color.input.radio.bg,
        boxShadow: `inset 0 0 0 1px ${vars.color.input.radio.border}`,

        vars: {
          [varNames.color.input.radio.fg]: vars.color.tinted.default.fg[0],
          [varNames.color.input.radio.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.input.radio.border]: vars.color.tinted.default.border[1],
        },
      },

      '& > input + span::after': {
        content: '""',
        position: 'absolute',
        top: `calc((${vars.input.radio.size} - ${vars.input.radio.markSize}) / 2)`,
        left: `calc((${vars.input.radio.size} - ${vars.input.radio.markSize}) / 2)`,
        width: vars.input.radio.markSize,
        height: vars.input.radio.markSize,
        backgroundColor: vars.color.input.radio.fg,
        borderRadius: '9999px',
        opacity: 0,
      },

      // hovered
      '& > input:not(:disabled):hover + span': {
        vars: {
          [varNames.color.input.radio.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.input.radio.border]: vars.color.tinted.default.border[2],
        },
      },

      // focused
      '& > input:not(:disabled):focus + span': {
        vars: {
          [varNames.color.input.radio.border]: vars.color.tinted.default.border[2],
        },
      },

      '& > input:checked + span::after': {
        opacity: 1,
      },
    },
  },
}

export const radioStyle: Style = {
  layers: {
    primitive,
  },
}
