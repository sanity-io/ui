import {globalStyle, style} from '@vanilla-extract/css'

export const buttonRoot = style({
  WebkitFontSmoothing: 'inherit',
  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  font: 'inherit',
  border: 0,
  outline: 'none',
  userSelect: 'none',
  textDecoration: 'none',
  boxSizing: 'border-box',
  padding: 0,
  whiteSpace: 'nowrap',
  textAlign: 'left',
  position: 'relative',
  verticalAlign: 'top',
  selectors: {
    '&::-moz-focus-inner': {
      border: 0,
      padding: 0,
    },
  },
})

globalStyle(`${buttonRoot} > span`, {
  display: 'block',
  flex: 1,
  minWidth: 0,
  borderRadius: 'inherit',
})

export const buttonWidthFill = style({
  width: ['-moz-available', '-webkit-fill-available', 'stretch'],
})

export const buttonLoadingBox = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--card-bg-color)',
  borderRadius: 'inherit',
  zIndex: 1,
  boxShadow: 'inherit',
})
