import {hues} from '@sanity/color'
import {ThemeColorBadge} from '@sanity/ui'

export const badge: ThemeColorBadge = {
  tones: {
    default: {
      modes: {
        default: {
          bg: hues.gray[200].hex,
          fg: hues.gray[800].hex,
          border: hues.gray[200].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.gray[700].hex,
          border: hues.gray[200].hex,
        },
      },
    },
    brand: {
      modes: {
        default: {
          bg: hues.blue[200].hex,
          fg: hues.blue[800].hex,
          border: hues.blue[200].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.blue[700].hex,
          border: hues.blue[200].hex,
        },
      },
    },
    positive: {
      modes: {
        default: {
          bg: hues.green[200].hex,
          fg: hues.green[800].hex,
          border: hues.green[200].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.green[700].hex,
          border: hues.green[200].hex,
        },
      },
    },
    caution: {
      modes: {
        default: {
          bg: hues.yellow[200].hex,
          fg: hues.yellow[800].hex,
          border: hues.yellow[200].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.yellow[700].hex,
          border: hues.yellow[200].hex,
        },
      },
    },
    critical: {
      modes: {
        default: {
          bg: hues.red[200].hex,
          fg: hues.red[800].hex,
          border: hues.red[200].hex,
        },
        outline: {
          bg: 'transparent',
          fg: hues.red[700].hex,
          border: hues.red[200].hex,
        },
      },
    },
  },
}
