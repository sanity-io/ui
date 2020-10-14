import {color} from '@sanity/color'
import {rgba} from 'polished'
import {ThemeColor} from '../../../types'
import {
  buildButtonDefaultMode,
  buildButtonGhostMode,
  buildButtonBleedMode,
  buildSyntaxTone,
} from './helpers'

const themeColor: ThemeColor = {
  avatar: {
    gray: color.gray[500].hex,
    blue: color.blue[500].hex,
    cyan: color.cyan[500].hex,
    green: color.green[500].hex,
    yellow: color.yellow[500].hex,
    orange: color.orange[500].hex,
    red: color.red[500].hex,
    magenta: color.magenta[500].hex,
    purple: color.purple[500].hex,
  },
  button: {
    tones: {
      default: {
        modes: {
          default: buildButtonDefaultMode('gray'),
          ghost: buildButtonGhostMode('gray'),
          bleed: buildButtonBleedMode('gray'),
        },
      },
      brand: {
        modes: {
          default: buildButtonDefaultMode('blue'),
          ghost: buildButtonGhostMode('blue'),
          bleed: buildButtonBleedMode('blue'),
        },
      },
      positive: {
        modes: {
          default: buildButtonDefaultMode('green'),
          ghost: buildButtonGhostMode('green'),
          bleed: buildButtonBleedMode('green'),
        },
      },
      caution: {
        modes: {
          default: buildButtonDefaultMode('yellow'),
          ghost: buildButtonGhostMode('yellow'),
          bleed: buildButtonBleedMode('yellow'),
        },
      },
      critical: {
        modes: {
          default: buildButtonDefaultMode('red'),
          ghost: buildButtonGhostMode('red'),
          bleed: buildButtonBleedMode('red'),
        },
      },
    },
  },
  card: {
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
  },
  input: {
    tones: {
      default: {
        enabled: {
          bg: color.black.hex,
          fg: color.white.hex,
          border: color.gray[800].hex,
          placeholder: color.gray[600].hex,
        },
        disabled: {
          bg: color.gray[900].hex,
          fg: color.gray[500].hex,
          border: color.gray[800].hex,
          placeholder: color.gray[600].hex,
        },
        hovered: {
          bg: color.black.hex,
          fg: color.white.hex,
          border: color.gray[700].hex,
          placeholder: color.gray[600].hex,
        },
      },
    },
  },
  syntax: {
    tones: {
      default: buildSyntaxTone(),
    },
  },
  switch: {
    tones: {
      default: {
        enabled: {
          thumb: color.black.hex,
          off: {
            bg: color.gray['500'].hex,
          },
          on: {
            bg: color.green['500'].hex,
          },
        },
        disabled: {
          thumb: color.gray['950'].hex,
          off: {
            bg: color.gray['800'].hex,
          },
          on: {
            bg: color.green['800'].hex,
          },
        },
      },
    },
  },
}

export default themeColor
