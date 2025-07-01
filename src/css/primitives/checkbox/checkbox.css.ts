import {globalStyle} from '@vanilla-extract/css'

import {_style} from '../../_style.css'
import {layers} from '../../layers.css'
import {vars} from '../../vars.css'

export const root: string = _style(layers.primitives, {
  position: 'relative',

  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})

export const input: string = _style(layers.primitives, {
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
})

export const presentation: string = _style(layers.primitives, {
  position: 'relative',
  display: 'block',
  width: vars.input.checkbox.size,
  height: vars.input.checkbox.size,
  boxSizing: 'border-box',
  borderRadius: vars.radius[2],
  lineHeight: 1,
  backgroundColor: vars.color.input.checkbox.bg,
  boxShadow: `inset 0 0 0 ${vars.input.border.width} ${vars.color.input.checkbox.border}`,
  color: vars.color.input.checkbox.fg,

  vars: {
    [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[0],
    [vars.color.input.checkbox.border]: vars.color.tinted.default.border[2],
    [vars.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
  },

  selectors: {
    // checked, not disabled, not invalid
    ':checked:not(:disabled):not([data-invalid]) + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.solid.default.bg[0],
        [vars.color.input.checkbox.border]: vars.color.solid.default.bg[0],
        [vars.color.input.checkbox.fg]: vars.color.solid.default.fg[0],
      },
    },

    // not checked, not invalid, hovered
    ':not(:checked):not([data-invalid]):hover + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
        [vars.color.input.checkbox.border]: vars.color.tinted.default.border[4],
        [vars.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
      },
    },

    // not checked, not disabled, invalid
    ':not(:checked):not(:disabled)[data-invalid] + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.critical.bg[1],
        [vars.color.input.checkbox.border]: vars.color.tinted.critical.border[3],
        [vars.color.input.checkbox.fg]: vars.color.tinted.critical.fg[4],
      },
    },

    // not checked, invalid, hovered
    ':not(:checked)[data-invalid]:hover + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.critical.bg[2],
        [vars.color.input.checkbox.border]: vars.color.tinted.critical.border[4],
        [vars.color.input.checkbox.fg]: vars.color.tinted.critical.fg[1],
        // [vars.color.input.checkbox.border]: vars.color.focusRing,
      },
    },

    // checked, not disabled, invalid
    ':checked:not(:disabled)[data-invalid] + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.solid.critical.bg[0],
        [vars.color.input.checkbox.border]: vars.color.solid.critical.bg[0],
        [vars.color.input.checkbox.fg]: vars.color.solid.critical.fg[0],
      },
    },

    // not checked, not indeterminate, read only
    ':not(:checked):not(:indeterminate)[data-read-only] + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[0],
        [vars.color.input.checkbox.border]: vars.color.tinted.default.border[2],
        [vars.color.input.checkbox.fg]: vars.color.tinted.default.fg[0],
      },
    },

    // checked, read only
    ':checked[data-read-only] + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
      },
    },

    // not checked, focused
    ':not(:checked):focus:focus-visible + &': {
      vars: {
        [vars.color.input.checkbox.border]: vars.color.focusRing,
      },
    },

    // checked, focused
    ':checked:focus:focus-visible + &': {
      vars: {
        [vars.color.input.checkbox.border]: vars.color.focusRing,
        [vars.color.input.checkbox.bg]: vars.color.focusRing,
        [vars.color.input.checkbox.fg]: vars.color.solid.default.fg[0],
      },
    },

    // not checked, disabled
    ':not(:checked):disabled + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
        [vars.color.input.checkbox.border]: vars.color.tinted.default.border[0],
        [vars.color.input.checkbox.fg]: vars.color.tinted.default.border[2],
      },
    },

    // checked, disabled
    ':checked:disabled + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.border[2],
        [vars.color.input.checkbox.border]: vars.color.tinted.default.border[2],
        [vars.color.input.checkbox.fg]: vars.color.tinted.default.bg[0],
      },
    },

    // indeterminate, disabled
    ':indeterminate:disabled + &': {
      vars: {
        [vars.color.input.checkbox.bg]: vars.color.tinted.default.bg[1],
        [vars.color.input.checkbox.border]: vars.color.tinted.default.border[0],
        [vars.color.input.checkbox.fg]: vars.color.tinted.default.border[2],
      },
    },
  },
})

globalStyle(`${presentation} svg`, {
  '@layer': {
    [layers.primitives]: {
      display: 'block',
      position: 'absolute',
      opacity: 0,
      height: '100%',
      width: '100%',
    },
  },
})

globalStyle(`${presentation} svg > path`, {
  '@layer': {
    [layers.primitives]: {
      vectorEffect: 'non-scaling-stroke',
      strokeWidth: '1.5px !important',
    },
  },
})

// show checkmark when checked
globalStyle(`:checked + ${presentation} svg:first-child`, {
  '@layer': {
    [layers.primitives]: {
      opacity: 1,
    },
  },
})

// show minus when indeterminate
globalStyle(`:indeterminate + ${presentation} svg:last-child`, {
  '@layer': {
    [layers.primitives]: {
      opacity: 1,
    },
  },
})
