import {hues} from '@sanity/color'
import {ThemeColorBadge} from '@sanity/ui'

export const badge: ThemeColorBadge = {
  tones: {
    default: {
      modes: {
        default: {
          bg: hues.gray[800].hex,
          fg: hues.gray[300].hex,
          border: hues.gray[800].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.gray[400].hex,
          border: hues.gray[800].hex,
        },
      },
    },
    brand: {
      modes: {
        default: {
          bg: hues.blue[800].hex,
          fg: hues.blue[300].hex,
          border: hues.blue[800].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.blue[400].hex,
          border: hues.blue[800].hex,
        },
      },
    },
    positive: {
      modes: {
        default: {
          bg: hues.green[800].hex,
          fg: hues.green[300].hex,
          border: hues.green[800].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.green[400].hex,
          border: hues.green[800].hex,
        },
      },
    },
    caution: {
      modes: {
        default: {
          bg: hues.yellow[800].hex,
          fg: hues.yellow[300].hex,
          border: hues.yellow[800].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.yellow[400].hex,
          border: hues.yellow[800].hex,
        },
      },
    },
    critical: {
      modes: {
        default: {
          bg: hues.red[800].hex,
          fg: hues.red[300].hex,
          border: hues.red[800].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.red[400].hex,
          border: hues.red[800].hex,
        },
      },
    },
  },
}
