import {createThemeContract} from '@vanilla-extract/css'

export const inputSlotVars = createThemeContract({
  input: {
    color: {
      placeholder: null,
    },

    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    ascenderHeight: null,
    descenderHeight: null,

    padding: null,
    gap: null,

    boxShadow: null,

    offset: null,
    size: null,
  },
})
