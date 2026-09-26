import {globalStyle, keyframes, style} from '@vanilla-extract/css'

const turn = keyframes({to: {transform: 'rotate(1turn)'}})

/**
 * The navbar toggle's spinner, in the icon's own box and at its size. Its arc
 * turns inside the box rather than the box itself: at the icon's odd pixel
 * size, a turning box wobbles in Safari
 */
export const spinner = style({})

globalStyle(`${spinner} path`, {
  animation: `${turn} 500ms linear infinite`,
  transformBox: 'view-box',
  transformOrigin: 'center',
})
