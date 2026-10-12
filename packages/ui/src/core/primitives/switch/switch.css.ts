import {style} from '@vanilla-extract/css'

export const switchRoot = style({
  position: 'relative',
  selectors: {
    '&:not([hidden])': {
      display: 'inline-block',
    },
  },
})

// Visually hides the input element while keeping it interactive, placed above
// the representation element
export const switchInput = style({
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
  zIndex: 1,
})

export const switchRepresentation = style({
  vars: {
    '--switch-box-shadow': 'none',
  },
  position: 'relative',
  // Make sure it’s not possible to interact with the wrapper element
  pointerEvents: 'none',
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      boxShadow: 'var(--switch-box-shadow)',
      borderRadius: 'inherit',
    },
  },
})

export const switchTrack = style({
  backgroundColor: 'var(--switch-bg-color)',
  position: 'absolute',
  left: 0,
  top: 0,
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})

export const switchThumb = style({
  position: 'absolute',
  transitionProperty: 'transform',
  background: 'var(--switch-fg-color)',
  boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})
