import {createThemeContract} from '@vanilla-extract/css'

export const skeletonSlotVars = createThemeContract({
  skeleton: {
    lineHeight: null,
    ascenderHeight: null,
    descenderHeight: null,
  },
})
