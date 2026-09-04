import {style} from '@vanilla-extract/css'

export const breadcrumbs = style({
  margin: 0,
  padding: 0,
  display: 'flex',
  listStyle: 'none',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  lineHeight: 0,
})

export const expandButton = style({
  appearance: 'none',
  selectors: {
    '&&': {
      margin: -4,
    },
  },
})
