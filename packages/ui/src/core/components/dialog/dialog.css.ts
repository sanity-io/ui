import {globalStyle, keyframes, style} from '@vanilla-extract/css'

export const dialogLayer = style({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})

const zoomIn = keyframes({
  from: {opacity: 0, transform: 'scale(0.95)'},
  to: {opacity: 1, transform: 'scale(1)'},
})

const fadeIn = keyframes({
  from: {opacity: 0},
  to: {opacity: 1},
})

export const dialogAnimated = style({
  animation: `${fadeIn} 200ms ease-out`,
})

globalStyle(`${dialogAnimated} > [data-ui='DialogCard']`, {
  animation: `${zoomIn} 200ms ease-out`,
})

export const dialogContainer = style({
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export const dialogCard = style({
  width: '100%',
  minHeight: 0,
  maxHeight: '100%',
  overflow: 'clip',
})

export const dialogLayout = style({
  minHeight: 0,
  width: '100%',
})

export const dialogHeader = style({
  position: 'relative',
  zIndex: 2,
})

export const dialogContent = style({
  position: 'relative',
  zIndex: 1,
  overflow: 'auto',
  outline: 'none',
})

export const dialogFooter = style({
  position: 'relative',
  zIndex: 3,
})
