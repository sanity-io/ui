import {style} from '@vanilla-extract/css'

export const workshopAside = style({
  'overflow': 'hidden',
  '@media': {
    'screen and (min-width: 600px)': {
      maxWidth: '300px',
      overflow: 'auto',
      selectors: {
        '&&': {
          minWidth: '180px',
        },
      },
    },
  },
})
