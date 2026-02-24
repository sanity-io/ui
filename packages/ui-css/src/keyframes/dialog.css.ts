import {keyframes} from '@vanilla-extract/css'

export const zoomIn = keyframes(
  {
    from: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  'zoom-in',
)

export const fadeIn = keyframes(
  {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  'fade-in',
)
