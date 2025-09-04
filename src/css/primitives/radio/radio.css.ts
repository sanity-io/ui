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
})

export const presentation: string = _style(layers.primitives, {
  'display': 'block',
  'position': 'relative',
  'width': vars.input.radio.size,
  'height': vars.input.radio.size,
  'borderRadius': '9999px',
  'backgroundColor': vars.color.input.radio.bg,
  'boxShadow': `inset 0 0 0 ${vars.input.border.width} ${vars.color.input.radio.border}`,

  'vars': {
    [vars.color.input.radio.fg]: vars.color.tinted.default.fg[0],
    [vars.color.input.radio.bg]: vars.color.tinted.default.bg[0],
    [vars.color.input.radio.border]: vars.color.tinted.default.border[1],
  },

  '::after': {
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

  'selectors': {
    // hovered
    [`${input}:not(:disabled):hover + &`]: {
      vars: {
        [vars.color.input.radio.bg]: vars.color.tinted.default.bg[1],
        [vars.color.input.radio.border]: vars.color.tinted.default.border[2],
      },
    },

    // focused
    [`${input}:not(:disabled):focus + &`]: {
      vars: {
        [vars.color.input.radio.border]: vars.color.tinted.default.border[2],
      },
    },

    [`${input}:checked + &::after`]: {
      opacity: 1,
    },
  },
})
