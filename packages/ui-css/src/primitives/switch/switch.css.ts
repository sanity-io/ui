import {createVar} from '@vanilla-extract/css'

import {_layers} from '../../layers.css'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

/** Local variables */
const _vars = {
  offset: createVar('offset'),
  size: createVar('size'),
  boxShadow: createVar('boxShadow'),
}

// vars.input.color.

/** `switch` - root class name */
export const root: string = _style(
  _layers.primitive,
  {
    inlineSize: 'max-content',

    vars: {
      [_vars.offset]: '0',
      [_vars.size]: `calc(${vars.input.switch.height} - ${vars.input.switch.padding} * 2)`,
      [_vars.boxShadow]: `inset 0 0 0 ${vars.input.border.width} ${vars.color.border}`,

      [vars.color.bg]: vars.input.color.boolean.valid.unchecked.enabled.bg,
      [vars.color.border]: vars.input.color.boolean.valid.unchecked.enabled.border,
      [vars.color.fg]: vars.input.color.boolean.valid.unchecked.enabled.fg,
    },
  },
  '',
)

export const input: string = _style(
  _layers.primitive,
  {
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
    borderRadius: vars.radius.full,

    // place the input element on top of the representation element
    zIndex: 1,
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
} as const

/* 2) unchecked, hovered */
_globalStyle(_layers.primitive, selectors.unchecked.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.valid.unchecked.hovered.bg,
    [vars.color.border]: vars.input.color.boolean.valid.unchecked.hovered.border,
    [vars.color.fg]: vars.input.color.boolean.valid.unchecked.hovered.fg,
  },
})

/* 3) checked, enabled */
_globalStyle(_layers.primitive, selectors.checked.enabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.valid.checked.enabled.bg,
    [vars.color.border]: vars.input.color.boolean.valid.checked.enabled.border,
    [vars.color.fg]: vars.input.color.boolean.valid.checked.enabled.fg,
  },
})

/* 4) checked, hovered */
_globalStyle(_layers.primitive, selectors.checked.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.valid.checked.hovered.bg,
    [vars.color.border]: vars.input.color.boolean.valid.checked.hovered.border,
    [vars.color.fg]: vars.input.color.boolean.valid.checked.hovered.fg,
  },
})

/* 5) invalid overrides */
_globalStyle(_layers.primitive, selectors.unchecked.invalid.enabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.unchecked.enabled.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.unchecked.enabled.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.unchecked.enabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.enabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.checked.enabled.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.checked.enabled.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.checked.enabled.fg,
  },
})

_globalStyle(_layers.primitive, selectors.unchecked.invalid.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.unchecked.hovered.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.unchecked.hovered.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.unchecked.hovered.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.checked.hovered.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.checked.hovered.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.checked.hovered.fg,
  },
})

/* 6) disabled LAST */
_globalStyle(_layers.primitive, selectors.unchecked.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.valid.unchecked.disabled.bg,
    [vars.color.border]: vars.input.color.boolean.valid.unchecked.disabled.border,
    [vars.color.fg]: vars.input.color.boolean.valid.unchecked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.valid.checked.disabled.bg,
    [vars.color.border]: vars.input.color.boolean.valid.checked.disabled.border,
    [vars.color.fg]: vars.input.color.boolean.valid.checked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.unchecked.invalid.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.unchecked.disabled.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.unchecked.disabled.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.unchecked.disabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.checked.invalid.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.boolean.invalid.checked.disabled.bg,
    [vars.color.border]: vars.input.color.boolean.invalid.checked.disabled.border,
    [vars.color.fg]: vars.input.color.boolean.invalid.checked.disabled.fg,
  },
})

export const presentation: string = _style(
  _layers.primitive,
  {
    display: 'block',
    position: 'relative',
    width: vars.input.switch.width,
    height: vars.input.switch.height,
    borderRadius: vars.radius.full,
    boxShadow: _vars.boxShadow,
    backgroundColor: vars.color.bg,
    transition: `background-color ${vars.input.switch.transitionDurationMs} ${vars.input.switch.transitionTimingFunction}`,

    // Make sure it’s not possible to interact with the presentation element
    pointerEvents: 'none',

    selectors: {
      // shift the thumb to the right when the switch is checked
      [`${input}:checked + &`]: {
        vars: {
          [_vars.offset]: `calc(${vars.input.switch.width} - (${vars.input.switch.padding} * 2) - ${_vars.size})`,
        },
      },

      // shift the thumb to the middle when the switch is indeterminate
      [`${input}:indeterminate + &`]: {
        vars: {
          [_vars.offset]: `calc(${vars.input.switch.width} / 2 - ${_vars.size} / 2 - ${vars.input.switch.padding})`,
        },
      },

      // focus ring when the switch is focused with keyboard
      [`${input}:focus + &`]: {
        boxShadow: `${vars.input.switch.focusRing}, ${_vars.boxShadow}`,
      },

      // hide focus ring when the switch is focused without keyboard
      [`${input}:focus:not(:focus-visible) + &`]: {
        boxShadow: _vars.boxShadow,
      },
    },
  },
  'presentation',
)

export const track: string = _style(
  _layers.primitive,
  {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // borderRadius: 'inherit',
  },
  'track',
)

export const thumb: string = _style(
  _layers.primitive,
  {
    display: 'block',
    position: 'absolute',
    left: vars.input.switch.padding,
    top: vars.input.switch.padding,
    width: _vars.size,
    height: _vars.size,
    backgroundColor: vars.color.fg,
    borderRadius: vars.radius.full,
    transform: `translate3d(${_vars.offset}, 0, 0)`,
    transition: `transform ${vars.input.switch.transitionDurationMs} ${vars.input.switch.transitionTimingFunction}`,
  },
  'thumb',
)
