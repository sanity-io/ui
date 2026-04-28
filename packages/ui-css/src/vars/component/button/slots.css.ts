import {createThemeContract} from '@vanilla-extract/css'

export const buttonSlotVars = createThemeContract({
  button: {
    color: {
      muted: {
        border: null,
      },
    },
  },
})
