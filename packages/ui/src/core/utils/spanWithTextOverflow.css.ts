import {style} from '@vanilla-extract/css'

export const spanWithTextOverflow = style({
  display: 'block',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: ['hidden', 'clip'],
})
