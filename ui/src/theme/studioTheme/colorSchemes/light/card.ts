import {color} from '@sanity/color'
import {rgba} from 'polished'
import {ThemeCardColor} from '../../../types'

export const card: ThemeCardColor = {
  tones: {
    default: {
      enabled: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      disabled: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      hovered: {
        bg: color.gray[50].hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      pressed: {
        bg: color.gray[100].hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      selected: {
        bg: color.blue[500].hex,
        fg: color.white.hex,
        muted: {
          fg: color.blue[100].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
    },

    transparent: {
      enabled: {
        bg: color.gray[50].hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      disabled: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      hovered: {
        bg: color.gray[50].hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      pressed: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
      selected: {
        bg: color.blue[500].hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[600].hex,
        },
        hairline: {
          soft: color.gray[200].hex,
          hard: color.gray[300].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[600].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.35),
          umbra: rgba(color.gray[500].hex, 0.2),
          penumbra: rgba(color.gray[500].hex, 0.14),
          ambient: rgba(color.gray[500].hex, 0.12),
        },
      },
    },
  },
}
