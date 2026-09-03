import {style} from '@vanilla-extract/css'

const LOADING_BAR_HEIGHT = 2

export const toast = style({
  pointerEvents: 'all',
  width: '100%',
  position: 'relative',
  overflow: ['hidden', 'clip'],
  selectors: {
    '&[data-has-duration]': {
      paddingBottom: `calc(${LOADING_BAR_HEIGHT}px / 2)`,
    },
  },
})

export const toastText = style({
  overflowX: 'auto',
})

export const loadingBar = style({
  display: 'flex',
  position: 'absolute',
  bottom: '0px',
  top: '0px',
  left: '0px',
  right: '0px',
  pointerEvents: 'none',
  zIndex: -1,
  overflow: ['hidden', 'clip'],
  background: 'transparent',
  alignItems: 'flex-end',
  willChange: 'opacity',
})

export const loadingBarMask = style({
  position: 'absolute',
  top: 0,
  left: `-${LOADING_BAR_HEIGHT}px`,
  right: `-${LOADING_BAR_HEIGHT}px`,
  bottom: `${LOADING_BAR_HEIGHT}px`,
  zIndex: 1,
})
