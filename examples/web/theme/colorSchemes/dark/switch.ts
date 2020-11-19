import {black, hues} from '@sanity/color'
import {ThemeColorSwitch} from '@sanity/ui'

export const _switch: ThemeColorSwitch = {
  tones: {
    default: {
      enabled: {
        thumb: black.hex,
        off: {
          bg: hues.gray['500'].hex,
        },
        on: {
          bg: hues.green['500'].hex,
        },
      },
      disabled: {
        thumb: hues.gray['950'].hex,
        off: {
          bg: hues.gray['800'].hex,
        },
        on: {
          bg: hues.green['800'].hex,
        },
      },
    },
  },
}
