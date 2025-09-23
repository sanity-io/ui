import {globalStyle, style} from '@vanilla-extract/css'

export const paneRoot: string = style({
  position: 'relative',
})

export const panePortal: string = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  pointerEvents: 'none',
})

globalStyle(`${panePortal} > *`, {
  pointerEvents: 'auto',
})
