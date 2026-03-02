import {globalStyle, style} from '@vanilla-extract/css'

export const editor = style({
  zIndex: 0,
  minHeight: '2em',
})

globalStyle(`${editor} > .cm-theme`, {
  height: 'stretch',
})
