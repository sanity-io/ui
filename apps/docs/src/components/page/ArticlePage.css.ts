import {BREAKPOINTS} from '@sanity/ui/css'
import {style} from '@vanilla-extract/css'

export const breadcrumbsNavCard = style({
  'position': 'sticky',
  'top': 0,
  'zIndex': 100,

  '@media': {
    [`(min-width: ${BREAKPOINTS[2]}px)`]: {
      selectors: {
        '&:not([hidden])': {
          display: 'none',
        },
      },
    },
  },
})

export const navCard = style({
  // 'maxWidth': 260,
  'height': '100vh',
  'position': 'sticky',
  'top': 0,

  '@media': {
    [`(max-width: ${BREAKPOINTS[2] - 1}px)`]: {
      selectors: {
        '&:not([hidden])': {
          display: 'none',
        },
      },
    },
  },
})
