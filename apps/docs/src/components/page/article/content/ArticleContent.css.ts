import {globalStyle, style} from '@vanilla-extract/css'

export const root = style({})

globalStyle(`${root} > *:first-child`, {
  marginTop: 0,
})

globalStyle(`${root} > *:last-child`, {
  marginBottom: 0,
})

export const bulletList = style({})

globalStyle(`${bulletList} > li [data-ui='Text'] > span:before`, {
  position: 'absolute',
  content: '•',
  width: '1em',
  marginLeft: '-1.5em',
  textAlign: 'right',
})

export const numberedList = style({
  counterReset: 'list',
})

globalStyle(`${numberedList} > li`, {
  counterIncrement: 'list',
})

globalStyle(`${numberedList} > li [data-ui='Text'] > span:before`, {
  position: 'absolute',
  content: `counter(list) '.'`,
  width: '1em',
  marginLeft: '-1.5em',
  textAlign: 'right',
})
