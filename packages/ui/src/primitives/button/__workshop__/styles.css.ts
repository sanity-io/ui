import {globalStyle, style} from '@vanilla-extract/css'

export const sanityUploadButton: string = style({})

globalStyle(`${sanityUploadButton} input`, {
  appearance: 'none',
  overflow: ['hidden', 'clip'],
  top: 0,
  left: 0,
  height: '100%',
  opacity: 0,
  position: 'absolute',
  maxWidth: 0,
  width: ['100%', '-moz-available', '-webkit-fill-available', 'stretch'],
})

globalStyle(`${sanityUploadButton} > span:nth-child(2)`, {
  width: 0,
  flex: 'none',
  padding: 0,
})

export const styledButton1: string = style({
  selectors: {
    '&:hover': {
      backgroundColor: 'red',
      boxShadow: 'none',
    },
  },
})
