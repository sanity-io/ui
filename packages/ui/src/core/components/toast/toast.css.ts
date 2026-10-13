import {css, firstThatWorks} from '#styled-system/css'

const LOADING_BAR_HEIGHT = 2

export const toast = css({
  'pointerEvents': 'all',
  'width': '100%',
  'position': 'relative',
  'overflow': firstThatWorks('clip', 'hidden'),
  '&[data-has-duration]': {
    paddingBottom: `calc(${LOADING_BAR_HEIGHT}px / 2)`,
  },
})

export const toastText = css({
  overflowX: 'auto',
})

export const loadingBar = css({
  display: 'flex',
  position: 'absolute',
  bottom: '0px',
  top: '0px',
  left: '0px',
  right: '0px',
  pointerEvents: 'none',
  zIndex: -1,
  overflow: firstThatWorks('clip', 'hidden'),
  background: 'transparent',
  alignItems: 'flex-end',
  willChange: 'opacity',
})

export const loadingBarMask = css({
  position: 'absolute',
  top: 0,
  left: `-${LOADING_BAR_HEIGHT}px`,
  right: `-${LOADING_BAR_HEIGHT}px`,
  bottom: `${LOADING_BAR_HEIGHT}px`,
  zIndex: 1,
})

export const loadingBarProgress = css({
  display: 'block',
  height: '100%',
  width: '100%',
  transformOrigin: '0% 50%',
})
