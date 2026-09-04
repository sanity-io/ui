import {style} from '@vanilla-extract/css'

export const hotkeys = style({
  font: 'inherit',
  padding: '1px',
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})
