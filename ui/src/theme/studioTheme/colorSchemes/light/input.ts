import {black, hues, white} from '@sanity/color'
import {ThemeColorInput} from '../../../types'

export const input: ThemeColorInput = {
  tones: {
    default: {
      enabled: {
        bg: white.hex,
        fg: black.hex,
        border: hues.gray[100].hex,
        placeholder: hues.gray[400].hex,
      },
      disabled: {
        bg: hues.gray[50].hex,
        fg: hues.gray[200].hex,
        border: hues.gray[100].hex,
        placeholder: hues.gray[200].hex,
      },
      hovered: {
        bg: white.hex,
        fg: black.hex,
        border: hues.gray[300].hex,
        placeholder: hues.gray[400].hex,
      },
      invalid: {
        bg: hues.red[50].hex,
        fg: hues.red[800].hex,
        border: hues.red[300].hex,
        placeholder: hues.red[400].hex,
      },
    },
  },
}
