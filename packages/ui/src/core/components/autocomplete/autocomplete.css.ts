import {globalStyle, style} from '@vanilla-extract/css'

export const autocomplete = style({
  lineHeight: 0,
})

export const autocompleteListBox = style({})

globalStyle(`${autocompleteListBox} > ul`, {
  listStyle: 'none',
  padding: 0,
  margin: 0,
})
