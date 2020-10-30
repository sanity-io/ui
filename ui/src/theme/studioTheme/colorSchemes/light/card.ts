import {black, hues, white} from '@sanity/color'
import {rgba} from 'polished'
import {ThemeCardColor} from '../../../types'

export const card: ThemeCardColor = {
  tones: {
    default: {
      enabled: {
        bg: white.hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      disabled: {
        bg: white.hex,
        fg: hues.gray[300].hex,
        muted: {
          fg: hues.gray[200].hex,
        },
        hairline: {
          soft: hues.gray[100].hex,
          hard: hues.gray[200].hex,
        },
        focusRing: 'transparent',
        link: hues.blue[300].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      hovered: {
        bg: hues.gray[50].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      pressed: {
        bg: hues.gray[100].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      selected: {
        bg: hues.blue[500].hex,
        fg: white.hex,
        muted: {
          fg: hues.blue[100].hex,
        },
        hairline: {
          soft: hues.blue[400].hex,
          hard: hues.blue[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[600].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
    },

    transparent: {
      enabled: {
        bg: hues.gray[50].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      disabled: {
        bg: white.hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      hovered: {
        bg: hues.gray[50].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      pressed: {
        bg: white.hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[700].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
      selected: {
        bg: hues.blue[500].hex,
        fg: white.hex,
        muted: {
          fg: hues.blue[100].hex,
        },
        hairline: {
          soft: hues.gray[200].hex,
          hard: hues.gray[300].hex,
        },
        focusRing: hues.blue[500].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.35),
          umbra: rgba(hues.gray[500].hex, 0.2),
          penumbra: rgba(hues.gray[500].hex, 0.14),
          ambient: rgba(hues.gray[500].hex, 0.12),
        },
      },
    },
  },
}
