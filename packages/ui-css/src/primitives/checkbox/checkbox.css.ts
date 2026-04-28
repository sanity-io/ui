import {createVar, globalStyle} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

const _vars = {
  boxShadow: createVar('boxShadow'),
}

export const root: string = _style(
  _layers.primitive,
  {
    inlineSize: 'max-content',

    vars: {
      [_vars.boxShadow]: `inset 0 0 0 ${vars.input.border.width} ${vars.color.border}`,

      /* 1) unchecked, enabled */
      [vars.color.bg]: vars.boolean.color.valid.unchecked.enabled.bg,
      [vars.color.border]: vars.boolean.color.valid.unchecked.enabled.border,
      [vars.color.fg]: vars.boolean.color.valid.unchecked.enabled.fg,
    },
  },
  '',
)

export const input: string = _style(
  _layers.primitive,
  {
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
  },
  'input',
)

// CSS state selectors
const has = (state: string) => `${root}:has(${input}${state})`
export const selectors = {
  unchecked: {
    enabled: has(':not(:checked):not(:disabled)'),
    hovered: has(':not(:checked):not(:disabled):hover'),
    disabled: has(':not(:checked):disabled'),

    invalid: {
      enabled: has(':not(:checked):not(:disabled)[data-invalid]'),
      hovered: has(':not(:checked):not(:disabled)[data-invalid]:hover'),
      disabled: has(':not(:checked):disabled[data-invalid]'),
    },
  },

  checked: {
    enabled: has(':checked:not(:disabled)'),
    hovered: has(':checked:not(:disabled):hover'),
    disabled: has(':checked:disabled'),

    invalid: {
      enabled: has(':checked:not(:disabled)[data-invalid]'),
      hovered: has(':checked:not(:disabled)[data-invalid]:hover'),
      disabled: has(':checked:disabled[data-invalid]'),
    },
  },

  focused: has(':not(:disabled):focus:focus-visible'),
} as const

/* 2) unchecked, hovered */
_globalStyle(_layers.primitive, selectors.unchecked.hovered, {
  vars: {
    [vars.color.bg]: vars.boolean.color.valid.unchecked.hovered.bg,
    [vars.color.border]: vars.boolean.color.valid.unchecked.hovered.border,
    [vars.color.fg]: vars.boolean.color.valid.unchecked.hovered.fg,
  },
})

/* 3) checked, enabled */
_globalStyle(_layers.primitive, selectors.checked.enabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.valid.checked.enabled.bg,
    [vars.color.border]: vars.boolean.color.valid.checked.enabled.border,
    [vars.color.fg]: vars.boolean.color.valid.checked.enabled.fg,
  },
})

/* 4) checked, hovered */
_globalStyle(_layers.primitive, selectors.checked.hovered, {
  vars: {
    [vars.color.bg]: vars.boolean.color.valid.checked.hovered.bg,
    [vars.color.border]: vars.boolean.color.valid.checked.hovered.border,
    [vars.color.fg]: vars.boolean.color.valid.checked.hovered.fg,
  },
})

/* 5) invalid overrides */
_globalStyle(_layers.primitive, selectors.unchecked.invalid.enabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.unchecked.enabled.bg,
    [vars.color.border]: vars.boolean.color.invalid.unchecked.enabled.border,
    [vars.color.fg]: vars.boolean.color.invalid.unchecked.enabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.enabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.checked.enabled.bg,
    [vars.color.border]: vars.boolean.color.invalid.checked.enabled.border,
    [vars.color.fg]: vars.boolean.color.invalid.checked.enabled.fg,
  },
})

_globalStyle(_layers.primitive, selectors.unchecked.invalid.hovered, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.unchecked.hovered.bg,
    [vars.color.border]: vars.boolean.color.invalid.unchecked.hovered.border,
    [vars.color.fg]: vars.boolean.color.invalid.unchecked.hovered.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.hovered, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.checked.hovered.bg,
    [vars.color.border]: vars.boolean.color.invalid.checked.hovered.border,
    [vars.color.fg]: vars.boolean.color.invalid.checked.hovered.fg,
  },
})

/* 6) disabled LAST */
_globalStyle(_layers.primitive, selectors.unchecked.disabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.valid.unchecked.disabled.bg,
    [vars.color.border]: vars.boolean.color.valid.unchecked.disabled.border,
    [vars.color.fg]: vars.boolean.color.valid.unchecked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.disabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.valid.checked.disabled.bg,
    [vars.color.border]: vars.boolean.color.valid.checked.disabled.border,
    [vars.color.fg]: vars.boolean.color.valid.checked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.unchecked.invalid.disabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.unchecked.disabled.bg,
    [vars.color.border]: vars.boolean.color.invalid.unchecked.disabled.border,
    [vars.color.fg]: vars.boolean.color.invalid.unchecked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.disabled, {
  vars: {
    [vars.color.bg]: vars.boolean.color.invalid.checked.disabled.bg,
    [vars.color.border]: vars.boolean.color.invalid.checked.disabled.border,
    [vars.color.fg]: vars.boolean.color.invalid.checked.disabled.fg,
  },
})

// focus visible
_globalStyle(_layers.primitive, selectors.focused, {
  vars: {
    [_vars.boxShadow]: `${vars.input.switch.focusRing}, inset 0 0 0 ${vars.input.border.width} ${vars.color.border}`,
  },
})

export const presentation: string = _style(
  _layers.primitive,
  {
    position: 'relative',
    display: 'block',
    width: vars.input.checkbox.size,
    height: vars.input.checkbox.size,
    boxSizing: 'border-box',
    lineHeight: 1,
    backgroundColor: vars.color.bg,
    boxShadow: _vars.boxShadow,
    color: vars.color.fg,
  },
  'presentation',
)

globalStyle(`${presentation} svg`, {
  '@layer': {
    [_layers.primitive]: {
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
    [_layers.primitive]: {
      vectorEffect: 'non-scaling-stroke',
      strokeWidth: '2px !important',
    },
  },
})

// show checkmark when checked
globalStyle(`:checked + ${presentation} svg:first-child`, {
  '@layer': {
    [_layers.primitive]: {
      opacity: 1,
    },
  },
})

// show minus when indeterminate
globalStyle(`:indeterminate + ${presentation} svg:last-child`, {
  '@layer': {
    [_layers.primitive]: {
      opacity: 1,
    },
  },
})
