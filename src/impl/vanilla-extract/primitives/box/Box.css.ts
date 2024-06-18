import {style} from '@vanilla-extract/css'

export const main = style({
  selectors: {
    '&:is(ol), &:is(ul)': {
      listStyle: 'none',
    },
  },
})
