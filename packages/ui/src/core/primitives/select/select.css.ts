import {style} from '@vanilla-extract/css'

export const select = style({
  position: 'relative',
  width: ['-moz-available', '-webkit-fill-available', 'stretch'],
  selectors: {
    '&:not([hidden])': {
      display: 'inline-block',
    },
  },
})
