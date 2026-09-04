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
