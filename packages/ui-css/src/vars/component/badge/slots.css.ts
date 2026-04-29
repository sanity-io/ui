import {createThemeContract} from '@vanilla-extract/css'

export const badgeSlotVars = createThemeContract({
  badge: {
    color: {
      bg: null,
      fg: null,
    },
  },
})
