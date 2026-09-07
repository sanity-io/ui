import {style} from '@vanilla-extract/css'

export const toastLayer = style({
  boxSizing: 'border-box',
  position: 'fixed',
  right: 0,
  bottom: 0,
  listStyle: 'none',
  pointerEvents: 'none',
  maxWidth: '420px',
  width: '100%',
})
