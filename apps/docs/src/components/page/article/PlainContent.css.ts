import {globalStyle, style} from '@vanilla-extract/css'

export const root = style({})

globalStyle(`${root} > *:first-child`, {
  marginTop: 0,
})

globalStyle(`${root} > *:last-child`, {
  marginBottom: 0,
})
