import {keyframes} from '@vanilla-extract/css'

export const pulse = keyframes(
  {
    '0%': {
      backgroundPosition: '100%',
    },
    '100%': {
      backgroundPosition: '-100%',
    },
  },
  'pulse',
)
