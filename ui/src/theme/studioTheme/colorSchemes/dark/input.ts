import {black, hues} from '@sanity/color'
import {ThemeColorInput} from '../../../types'

export const input: ThemeColorInput = {
  tones: {
    default: {
      enabled: {
        bg: black.hex,
        fg: hues.gray[50].hex,
        border: hues.gray[800].hex,
        placeholder: hues.gray[600].hex,
      },
      disabled: {
        bg: hues.gray[900].hex,
        fg: hues.gray[500].hex,
        border: hues.gray[800].hex,
        placeholder: hues.gray[600].hex,
      },
      hovered: {
        bg: black.hex,
        fg: hues.gray[50].hex,
        border: hues.gray[700].hex,
        placeholder: hues.gray[600].hex,
      },
      invalid: {
        bg: hues.red[900].hex,
        fg: hues.red[100].hex,
        border: hues.red[800].hex,
        placeholder: hues.red[600].hex,
      },
    },
  },
}
