import {style} from '@vanilla-extract/css'

export const debugCard: string = style({
  outline: '1px solid red',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})
