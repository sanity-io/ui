import {FONT_TEXT_SIZE, SPACE} from '@sanity/ui/theme'

import {_responsiveRule} from '../../_responsiveRule'
import {varNames, vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.input': {
    position: 'relative',
  },

  '.input-element': {
    WebkitFontSmoothing: 'inherit',
    appearance: 'none',
    border: 0,
    outline: 'none',
    margin: 0,
    fontFamily: vars.font.text.family,
    fontSize: vars.input.fontSize,
    lineHeight: vars.input.lineHeight,
    letterSpacing: vars.input.letterSpacing,
    backgroundColor: 'transparent',
    color: vars.color.input.text.fg,
    padding: [
      `calc(${vars.input.padding} - ${vars.input.ascenderHeight})`,
      vars.input.padding,
      `calc(${vars.input.padding} - ${vars.input.descenderHeight})`,
      vars.input.padding,
    ].join(' '),
    borderRadius: 'inherit',
    position: 'relative',
    zIndex: 1,
    display: 'block',
    boxSizing: 'border-box',
    resize: 'none',
    // @ts-expect-error - TODO: fix this
    width: ['-moz-available', '-webkit-fill-available', 'stretch'],

    nest: {
      '&::placeholder': {
        color: vars.color.input.text.placeholder,
        opacity: 1,
      },

      '.input[data-icon-left] &': {
        paddingLeft: `calc(${vars.input.padding} + calc(${vars.input.lineHeight} - ${vars.input.ascenderHeight} - ${vars.input.descenderHeight}) + ${vars.input.gap})`,
      },

      '.input[data-icon-right] &': {
        paddingRight: `calc(${vars.input.padding} + calc(${vars.input.lineHeight} - ${vars.input.ascenderHeight} - ${vars.input.descenderHeight}) + ${vars.input.gap})`,
      },

      '.input:not([data-invalid]) &': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.default.fg[2],
          [varNames.color.input.text.placeholder]: vars.color.tinted.default.border[4],
        },
      },

      '.input:not([data-invalid]) &:hover': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.default.fg[0],
        },
      },

      '.input:not([data-invalid]) &:focus': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.default.fg[0],
        },
      },

      '.input:not([data-invalid]) &:disabled': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.default.border[4],
          [varNames.color.input.text.placeholder]: vars.color.tinted.default.border[1],
        },
      },

      '.input[data-invalid] &': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.critical.fg[2],
          [varNames.color.input.text.placeholder]: vars.color.tinted.critical.border[2],
        },
      },

      '.input[data-invalid] &:hover': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.critical.fg[1],
        },
      },

      '.input[data-invalid] &:focus': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.critical.fg[1],
        },
      },

      '.input[data-invalid] &:disabled': {
        vars: {
          [varNames.color.input.text.fg]: vars.color.tinted.critical.border[4],
          [varNames.color.input.text.placeholder]: vars.color.tinted.critical.border[2],
        },
      },
    },
  },

  '.input-presentation': {
    backgroundColor: vars.color.input.text.bg,
    borderRadius: 'inherit',
    boxShadow: `inset 0 0 0 1px ${vars.color.input.text.border}`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    pointerEvents: 'none',
    zIndex: 0,

    nest: {
      '.input[data-prefix] &': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      '.input[data-suffix] &': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },

      // focus ring
      '.input .input-element:not([data-no-focus-ring]):focus + &': {
        outlineWidth: vars.input.text.focusRing.width,
        outlineStyle: 'solid',
        outlineColor: vars.color.focusRing,
        outlineOffset: vars.input.text.focusRing.offset,
      },

      // valid

      '.input:not([data-invalid]) &': {
        vars: {
          [varNames.color.input.text.bg]: vars.color.tinted.default.bg[0],
          [varNames.color.input.text.border]: vars.color.tinted.default.border[1],
        },
      },

      '.input:not([data-invalid])[data-read-only] .input-element + &': {
        vars: {
          [varNames.color.input.text.bg]: vars.color.tinted.default.bg[1],
        },
      },

      '.input:not([data-invalid]):not([data-read-only]) .input-element:not(:disabled):hover + &': {
        vars: {
          [varNames.color.input.text.border]: vars.color.tinted.default.border[2],
        },
      },

      '.input:not([data-invalid]) .input-element:focus + &': {
        vars: {
          [varNames.color.input.text.border]: vars.color.tinted.default.border[2],
          [varNames.color.input.text.fg]: vars.color.tinted.default.fg[1],
        },
      },

      '.input:not([data-invalid]) .input-element:disabled + &': {
        vars: {
          [varNames.color.input.text.bg]: vars.color.tinted.default.bg[1],
          [varNames.color.input.text.border]: vars.color.tinted.default.border[0],
          [varNames.color.muted.fg]: vars.color.tinted.default.border[4],
        },
      },

      // invalid

      '.input[data-invalid] &': {
        vars: {
          [varNames.color.input.text.bg]: vars.color.tinted.critical.bg[1],
          [varNames.color.input.text.border]: vars.color.tinted.critical.border[1],
          [varNames.color.muted.fg]: vars.color.tinted.critical.fg[4],
        },
      },

      '.input[data-invalid] .input-element:not(:disabled):hover + &': {
        vars: {
          [varNames.color.input.text.border]: vars.color.tinted.critical.border[2],
        },
      },

      '.input[data-invalid] .input-element:focus + &': {
        vars: {
          [varNames.color.input.text.border]: vars.color.tinted.critical.border[2],
        },
      },

      '.input[data-invalid] .input-element:disabled + &': {
        vars: {
          [varNames.color.input.text.bg]: vars.color.tinted.critical.bg[1],
          [varNames.color.input.text.border]: vars.color.tinted.critical.border[0],
        },
      },

      '.input:not(.input-b) &': {
        [varNames.color.input.text.border]: 'transparent',
      },
    },
  },
}

for (const size of FONT_TEXT_SIZE) {
  const source = vars.font.text.sizes[size]

  _responsiveRule(primitive, `input-${size}`, {
    [varNames.input.fontSize]: source.fontSize,
    [varNames.input.lineHeight]: source.lineHeight,
    [varNames.input.letterSpacing]: source.letterSpacing,
    [varNames.input.ascenderHeight]: source.ascenderHeight,
    [varNames.input.descenderHeight]: source.descenderHeight,
  })
}

for (const space of SPACE) {
  _responsiveRule(primitive, `input-p-${space}`, {
    [varNames.input.padding]: vars.space[space],
  })
}

for (const space of SPACE) {
  _responsiveRule(primitive, `input-g-${space}`, {
    [varNames.input.gap]: vars.space[space],
  })
}

export const _inputStyle: Style = {layers: {primitive}}
