import {keyframes, style} from '@vanilla-extract/css'

const rotate = keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'},
})

const size = 'round(1em, 2px)'
export const spinnerIcon = style({
  animation: `${rotate} 500ms linear infinite`,
  // Prevents a wobbly spinner on Safari
  height: size,
  width: size,
})
