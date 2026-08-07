import {style} from '@vanilla-extract/css'

export const srOnly = style({
  display: 'block',
  width: 0,
  height: 0,
  position: 'absolute',
  overflow: ['hidden', 'clip'],
})
