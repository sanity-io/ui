import {black, ColorHueKey, hues} from '@sanity/color'
import {rgba} from 'polished'
import {ThemeColorCard, ThemeCardToneColor} from '../../../types'

export const card: ThemeColorCard = {
  tones: {
    default: {
      enabled: {
        bg: black.hex,
        fg: hues.gray[100].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.red[400].hex,
        },
        hairline: {
          soft: hues.gray[900].hex,
          hard: hues.gray[800].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      disabled: {
        bg: black.hex,
        fg: hues.gray[100].hex,
        muted: {
          fg: hues.gray[50].hex,
        },
        accent: {
          fg: hues.red[100].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      hovered: {
        bg: hues.gray[950].hex,
        fg: hues.gray[100].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.red[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      pressed: {
        bg: hues.gray[900].hex,
        fg: hues.gray[100].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.red[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      selected: {
        bg: hues.blue[400].hex,
        fg: black.hex,
        muted: {
          fg: hues.blue[800].hex,
        },
        accent: {
          fg: hues.red[300].hex,
        },
        hairline: {
          soft: hues.blue[900].hex,
          hard: hues.blue[800].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[700].hex,
        shadow: {
          outline: rgba(hues.blue[600].hex, 0.2),
          umbra: rgba(hues.blue[600].hex, 0.2),
          penumbra: rgba(hues.blue[600].hex, 0.14),
          ambient: rgba(hues.blue[600].hex, 0.12),
        },
      },
    },

    transparent: {
      enabled: {
        bg: hues.gray[900].hex,
        fg: hues.gray[200].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.red[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      disabled: {
        bg: hues.gray[50].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.gray[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      hovered: {
        bg: hues.gray[950].hex,
        fg: hues.gray[200].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.red[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      pressed: {
        bg: hues.gray[50].hex,
        fg: black.hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.gray[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
      selected: {
        bg: hues.blue[500].hex,
        fg: hues.gray[100].hex,
        muted: {
          fg: hues.gray[400].hex,
        },
        accent: {
          fg: hues.gray[300].hex,
        },
        hairline: {
          soft: hues.gray[950].hex,
          hard: hues.gray[900].hex,
        },
        focusRing: hues.blue[400].hex,
        link: hues.blue[400].hex,
        shadow: {
          outline: rgba(hues.gray[500].hex, 0.25),
          umbra: rgba(black.hex, 0.2),
          penumbra: rgba(black.hex, 0.14),
          ambient: rgba(black.hex, 0.12),
        },
      },
    },

    positive: buildCardTone('green'),
    caution: buildCardTone('yellow'),
    critical: buildCardTone('red'),
    brand: buildCardTone('blue'),
  },
}

function buildCardTone(hueKey: ColorHueKey): ThemeCardToneColor {
  const hue = hues[hueKey]

  return {
    enabled: {
      bg: hue[400].hex,
      fg: black.hex,
      muted: {
        fg: hue[800].hex,
      },
      accent: {
        fg: hue[800].hex,
      },
      hairline: {
        soft: hue[950].hex,
        hard: hue[900].hex,
      },
      focusRing: hues.blue[400].hex,
      link: hues.blue[400].hex,
      shadow: {
        outline: rgba(hue[500].hex, 0.25),
        umbra: rgba(black.hex, 0.2),
        penumbra: rgba(black.hex, 0.14),
        ambient: rgba(black.hex, 0.12),
      },
    },
    disabled: {
      bg: hue[50].hex,
      fg: black.hex,
      muted: {
        fg: hue[400].hex,
      },
      accent: {
        fg: hue[300].hex,
      },
      hairline: {
        soft: hue[400].hex,
        hard: hue[500].hex,
      },
      focusRing: hues.blue[400].hex,
      link: hues.blue[400].hex,
      shadow: {
        outline: rgba(hue[500].hex, 0.25),
        umbra: rgba(black.hex, 0.2),
        penumbra: rgba(black.hex, 0.14),
        ambient: rgba(black.hex, 0.12),
      },
    },
    hovered: {
      bg: hue[300].hex,
      fg: black.hex,
      muted: {
        fg: hue[800].hex,
      },
      accent: {
        fg: hue[800].hex,
      },
      hairline: {
        soft: hue[950].hex,
        hard: hue[900].hex,
      },
      focusRing: hues.blue[400].hex,
      link: hues.blue[400].hex,
      shadow: {
        outline: rgba(hue[500].hex, 0.25),
        umbra: rgba(black.hex, 0.2),
        penumbra: rgba(black.hex, 0.14),
        ambient: rgba(black.hex, 0.12),
      },
    },
    pressed: {
      bg: hue[50].hex,
      fg: black.hex,
      muted: {
        fg: hue[400].hex,
      },
      accent: {
        fg: hue[300].hex,
      },
      hairline: {
        soft: hue[950].hex,
        hard: hue[900].hex,
      },
      focusRing: hues.blue[400].hex,
      link: hues.blue[400].hex,
      shadow: {
        outline: rgba(hue[500].hex, 0.25),
        umbra: rgba(black.hex, 0.2),
        penumbra: rgba(black.hex, 0.14),
        ambient: rgba(black.hex, 0.12),
      },
    },
    selected: {
      bg: hues.blue[400].hex,
      fg: black.hex,
      muted: {
        fg: hue[800].hex,
      },
      accent: {
        fg: hue[800].hex,
      },
      hairline: {
        soft: hue[950].hex,
        hard: hue[900].hex,
      },
      focusRing: hues.blue[400].hex,
      link: hues.blue[400].hex,
      shadow: {
        outline: rgba(hue[500].hex, 0.25),
        umbra: rgba(black.hex, 0.2),
        penumbra: rgba(black.hex, 0.14),
        ambient: rgba(black.hex, 0.12),
      },
    },
  }
}
