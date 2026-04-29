import {createThemeContract} from '@vanilla-extract/css'

export const buttonSlotVars = createThemeContract({
  button: {
    color: {
      bg: null,
      border: null,
      fg: null,
      muted: {
        bg: null,
        border: null,
        fg: null,
      },
    },
  },
})
