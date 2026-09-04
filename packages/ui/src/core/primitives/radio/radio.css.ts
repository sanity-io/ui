import {style} from '@vanilla-extract/css'

export const radio = style({
  position: 'relative',
  selectors: {
    '&:not([hidden])': {
      display: 'inline-block',
    },
  },
})
