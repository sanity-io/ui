import {color} from '@sanity/color'
import {rgba} from 'polished'
import {ThemeCardColor} from '../../../types'

export const card: ThemeCardColor = {
  tones: {
    default: {
      enabled: {
        bg: color.black.hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[800].hex,
          hard: color.gray[700].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.4),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      disabled: {
        bg: color.black.hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      hovered: {
        bg: color.gray[950].hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      pressed: {
        bg: color.gray[900].hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      selected: {
        bg: color.blue[400].hex,
        fg: color.black.hex,
        muted: {
          fg: color.blue[800].hex,
        },
        hairline: {
          soft: color.blue[900].hex,
          hard: color.blue[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[700].hex,
        shadow: {
          outline: rgba(color.blue[600].hex, 0.2),
          umbra: rgba(color.blue[600].hex, 0.2),
          penumbra: rgba(color.blue[600].hex, 0.14),
          ambient: rgba(color.blue[600].hex, 0.12),
        },
      },
    },
    transparent: {
      enabled: {
        bg: color.gray[950].hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      disabled: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      hovered: {
        bg: color.gray[950].hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      pressed: {
        bg: color.white.hex,
        fg: color.black.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
      selected: {
        bg: color.blue[500].hex,
        fg: color.white.hex,
        muted: {
          fg: color.gray[400].hex,
        },
        hairline: {
          soft: color.gray[900].hex,
          hard: color.gray[800].hex,
        },
        focusRing: color.blue[500].hex,
        link: color.blue[400].hex,
        shadow: {
          outline: rgba(color.gray[500].hex, 0.2),
          umbra: rgba(color.black.hex, 0.2),
          penumbra: rgba(color.black.hex, 0.14),
          ambient: rgba(color.black.hex, 0.12),
        },
      },
    },
  },
}
