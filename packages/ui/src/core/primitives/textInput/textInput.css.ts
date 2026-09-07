import {style} from '@vanilla-extract/css'

export const textInputLeftBox = style({
  position: 'absolute',
  top: 0,
  left: 0,
})

export const textInputRightBox = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const textInputClearButton = style({
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})
