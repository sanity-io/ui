import {globalStyle, style} from '@vanilla-extract/css'

export const tabList = style({})

// Limits the width of tabs in the tablist. `display: inline-block` and
// `vertical-align: middle` on the same children come from Inline itself.
globalStyle(`${tabList} > div`, {
  maxWidth: '100%',
  boxSizing: 'border-box',
})
