import {BREAKPOINTS} from '@sanity/ui/css'
import {style} from '@vanilla-extract/css'

export const root = style({
  '@media': {
    [`screen and (min-width: ${BREAKPOINTS[2]}px)`]: {
      maxWidth: '300px',
      minWidth: '240px',
    },
  },
})
