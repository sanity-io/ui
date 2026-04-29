import {_layers} from '../../layers.css'
import {_globalStyle} from '../../lib/css/_globalStyle.css'
import {_style} from '../../lib/css/_style.css'
import {vars} from '../../vars'

export const root: string = _style(
  _layers.primitive,
  {
    inlineSize: 'max-content',

    vars: {
      // 1) enabled baseline
      [vars.color.bg]: vars.input.color.valid.enabled.bg,
      [vars.color.border]: vars.input.color.valid.enabled.border,
      [vars.color.fg]: vars.input.color.valid.enabled.fg,
    },
  },
  '',
)

export const input: string = _style(
  _layers.primitive,
  {
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
    borderRadius: vars.radius.full,
    border: 'none',
  },
  'input',
)

const has = (state: string) => `${root}:has(${input}${state})`
export const selectors = {
  enabled: has(':not(:disabled)'),
  hovered: has(':not(:disabled):hover'),
  disabled: has(':disabled'),

  invalid: {
    enabled: has(':not(:disabled)[data-invalid]'),
    hovered: has(':not(:disabled)[data-invalid]:hover'),
    disabled: has(':disabled[data-invalid]'), // keep only if you want a distinct disabled-invalid look
  },
} as const

// 2) hover (only when enabled)
_globalStyle(_layers.primitive, selectors.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.valid.hovered.bg,
    [vars.color.border]: vars.input.color.valid.hovered.border,
    [vars.color.fg]: vars.input.color.valid.hovered.fg,
  },
})

// 3) invalid overrides
_globalStyle(_layers.primitive, selectors.invalid.enabled, {
  vars: {
    [vars.color.bg]: vars.input.color.invalid.enabled.bg,
    [vars.color.border]: vars.input.color.invalid.enabled.border,
    [vars.color.fg]: vars.input.color.invalid.enabled.fg,
  },
})
_globalStyle(_layers.primitive, selectors.invalid.hovered, {
  vars: {
    [vars.color.bg]: vars.input.color.invalid.hovered.bg,
    [vars.color.border]: vars.input.color.invalid.hovered.border,
    [vars.color.fg]: vars.input.color.invalid.hovered.fg,
  },
})

// 4) disabled wins
_globalStyle(_layers.primitive, selectors.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.valid.disabled.bg,
    [vars.color.border]: vars.input.color.valid.disabled.border,
    [vars.color.fg]: vars.input.color.valid.disabled.fg,
  },
})
// only if distinct
_globalStyle(_layers.primitive, selectors.invalid.disabled, {
  vars: {
    [vars.color.bg]: vars.input.color.invalid.disabled.bg,
    [vars.color.border]: vars.input.color.invalid.disabled.border,
    [vars.color.fg]: vars.input.color.invalid.disabled.fg,
  },
})

export const presentation: string = _style(
  _layers.primitive,
  {
    'display': 'block',
    'position': 'relative',
    'width': vars.input.radio.size,
    'height': vars.input.radio.size,
    'borderRadius': vars.radius.full,
    'backgroundColor': vars.color.bg,
    'boxShadow': vars.input.boxShadow,

    'vars': {
      [vars.input.boxShadow]: `inset 0 0 0 ${vars.input.border.width} ${vars.color.border}`,
    },

    '::after': {
      content: '""',
      position: 'absolute',
      top: `calc((${vars.input.radio.size} - ${vars.input.radio.markSize}) / 2)`,
      left: `calc((${vars.input.radio.size} - ${vars.input.radio.markSize}) / 2)`,
      width: vars.input.radio.markSize,
      height: vars.input.radio.markSize,
      backgroundColor: vars.color.fg,
      borderRadius: '9999px',
      opacity: 0,
    },

    'selectors': {
      // focused
      [`${input}:not(:disabled):focus + &`]: {
        boxShadow: `${vars.input.radio.focusRing}, ${vars.input.boxShadow}`,
      },

      [`${input}:checked + &::after`]: {
        opacity: 1,
      },
    },
  },
  'presentation',
)
