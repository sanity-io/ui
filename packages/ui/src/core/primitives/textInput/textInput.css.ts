import {css} from '#styled-system/css'

export const textInputLeftBox = css({
  position: 'absolute',
  top: 0,
  left: 0,
})

export const textInputRightBox = css({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const textInputClearButton = css({
  '&:not([hidden])': {
    display: 'block',
  },
})
