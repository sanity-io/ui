import {css, keyframes} from '#styled-system/css'

const rotate = keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'},
})

const size = 'round(1em, 2px)'
export const spinnerIcon = css({
  animation: `${rotate} 500ms linear infinite`,
  // Prevents a wobbly spinner on Safari
  height: size,
  width: size,
})
