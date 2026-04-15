import {BREAKPOINTS} from '@sanity/ui'
import {style} from '@vanilla-extract/css'

export const tocBox = style({
  'maxWidth': 260,
  'height': '100vh',
  'position': 'sticky',
  'top': 0,

  '@media': {
    [`screen and (max-width: ${BREAKPOINTS[4] - 1}px)`]: {
      selectors: {
        '&&:not([hidden])': {
          display: 'none',
        },
      },
    },
  },
})
