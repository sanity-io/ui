import {style} from '@vanilla-extract/css'

/** A native color input, trimmed down to its swatch */
export const swatch = style({
  boxSizing: 'border-box',
  flex: 'none',
  width: 33,
  height: 33,
  padding: 0,
  border: '1px solid var(--card-border-color)',
  borderRadius: 4,
  background: 'none',
  cursor: 'pointer',
  selectors: {
    '&::-webkit-color-swatch-wrapper': {
      padding: 0,
    },
    '&::-webkit-color-swatch': {
      border: 'none',
      borderRadius: 3,
    },
    '&::-moz-color-swatch': {
      border: 'none',
      borderRadius: 3,
    },
  },
})

/** A native range input, themed through `accent-color` */
export const range = style({
  display: 'block',
  width: '100%',
  margin: 0,
  accentColor: 'var(--card-focus-ring-color)',
})

/** Lets the color row's text shrink and truncate instead of widening the row */
export const colorRowText = style({
  minWidth: 0,
})
