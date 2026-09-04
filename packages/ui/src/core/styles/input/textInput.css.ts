import {style} from '@vanilla-extract/css'

export const textInputRoot = style({
  alignItems: 'center',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})

export const inputRoot = style({
  flex: 1,
  minWidth: 0,
  display: 'block',
  position: 'relative',
})
