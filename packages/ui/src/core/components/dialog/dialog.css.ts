import {css, firstThatWorks, keyframes} from '#styled-system/css'

export const dialogLayer = css({
  'top': 0,
  'left': 0,
  'right': 0,
  'bottom': 0,
  'alignItems': 'center',
  'justifyContent': 'center',
  'outline': 'none',
  '&:not([hidden])': {
    display: 'flex',
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

export const dialogAnimated = css({
  'animation': `${fadeIn} 200ms ease-out`,
  "& > [data-ui='DialogCard']": {
    animation: `${zoomIn} 200ms ease-out`,
  },
})

export const dialogContainer = css({
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

export const dialogCard = css({
  width: '100%',
  minHeight: 0,
  maxHeight: '100%',
  overflow: firstThatWorks('clip', 'hidden'),
})

export const dialogLayout = css({
  minHeight: 0,
  width: '100%',
})

export const dialogHeader = css({
  position: 'relative',
  zIndex: 2,
})

export const dialogContent = css({
  position: 'relative',
  zIndex: 1,
  overflow: 'auto',
  outline: 'none',
})

export const dialogFooter = css({
  position: 'relative',
  zIndex: 3,
})
