import {globalStyle, style} from '@vanilla-extract/css'

export const textInputLeftBox = style({
  position: 'absolute',
  top: 0,
  left: 0,
})

export const textInputRightBox = style({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const textInputClearButton = style({
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})

export const textInputPrefix = style({
  selectors: {
    '&&': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
})

globalStyle(`${textInputPrefix} > span`, {
  display: 'block',
  margin: -1,
})

export const textInputSuffix = style({
  selectors: {
    '&&': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
})

globalStyle(`${textInputSuffix} > span`, {
  display: 'block',
  margin: -1,
})

export const textInputRightCard = style({
  position: 'absolute',
  top: 0,
  right: 0,
  selectors: {
    '&&': {
      backgroundColor: 'transparent',
    },
  },
})
