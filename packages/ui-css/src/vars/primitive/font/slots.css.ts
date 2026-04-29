import {createThemeContract} from '@vanilla-extract/css'

export const fontSlotVars = createThemeContract({
  font: {
    family: null,
    featureSettings: null,
    textTransform: null,

    capHeight: null,
    fontSize: null,
    lineHeight: null,
    ascenderHeight: null,
    descenderHeight: null,
    letterSpacing: null,
    fontWeight: null,
    iconSize: null,
    iconOffset: null,
    customIconOffset: null,
    customIconSize: null,

    weight: {
      regular: null,
      medium: null,
      semibold: null,
      bold: null,
    },

    color: {
      fg: null,
      muted: {
        bg: null,
        fg: null,
      },
      link: {
        fg: null,
        hover: {
          fg: null,
        },
      },
    },
  },
})
