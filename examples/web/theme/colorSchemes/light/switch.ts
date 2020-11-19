import {white, hues} from '@sanity/color'
import {ThemeColorSwitch} from '@sanity/ui'

export const _switch: ThemeColorSwitch = {
  tones: {
    default: {
      enabled: {
        thumb: white.hex,
        off: {
          bg: hues.gray['500'].hex,
        },
        on: {
          bg: hues.green['500'].hex,
        },
      },
      disabled: {
        thumb: hues.gray['50'].hex,
        off: {
          bg: hues.gray['200'].hex,
        },
        on: {
          bg: hues.green['200'].hex,
        },
      },
    },
  },
}
