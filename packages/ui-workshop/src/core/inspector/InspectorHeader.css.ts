import {style} from '@vanilla-extract/css'

export const inspectorHeader = style({
  selectors: {
    '&&': {
      flex: 'none',
      position: 'sticky',
      top: 0,
    },
  },
})

export const inspectorHeaderCard = style({
  'lineHeight': 0,
  '@media': {
    'screen and (max-width: 599px)': {
      textAlign: 'center',
    },
  },
})
