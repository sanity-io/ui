import {globalStyle, style} from '@vanilla-extract/css'

export const tabList = style({})

// Limits the width of tabs in the tablist
globalStyle(`${tabList} > div`, {
  display: 'inline-block',
  verticalAlign: 'middle',
  maxWidth: '100%',
  boxSizing: 'border-box',
})
