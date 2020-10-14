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
    gray: color.gray[200].hex,
    blue: color.blue[200].hex,
    cyan: color.cyan[200].hex,
    green: color.green[200].hex,
    yellow: color.yellow[200].hex,
    orange: color.orange[200].hex,
    red: color.red[200].hex,
    magenta: color.magenta[200].hex,
    purple: color.purple[200].hex,
  },
  button: {
    tones: {
      default: {
        modes: {
          default: buildButtonDefaultMode('blue'),
          ghost: buildButtonGhostMode('blue'),
          bleed: buildButtonBleedMode('blue'),
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
          bg: color.white.hex,
          fg: color.black.hex,
          muted: {
            fg: color.gray[600].hex,
          },
          hairline: {
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
            umbra: rgba(color.gray[500].hex, 0.2),
            penumbra: rgba(color.gray[500].hex, 0.14),
            ambient: rgba(color.gray[500].hex, 0.12),
          },
        },
      },
      transparent: {
        enabled: {
          bg: color.gray[100].hex,
          fg: color.black.hex,
          muted: {
            fg: color.gray[600].hex,
          },
          hairline: {
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
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
            soft: color.gray[100].hex,
            hard: color.gray[200].hex,
          },
          focusRing: color.blue[500].hex,
          link: color.blue[600].hex,
          shadow: {
            outline: rgba(color.gray[500].hex, 0.2),
            umbra: rgba(color.gray[500].hex, 0.2),
            penumbra: rgba(color.gray[500].hex, 0.14),
            ambient: rgba(color.gray[500].hex, 0.12),
          },
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
          thumb: color.white.hex,
          off: {
            bg: color.gray['500'].hex,
          },
          on: {
            bg: color.green['500'].hex,
          },
        },
        disabled: {
          thumb: color.gray['50'].hex,
          off: {
            bg: color.gray['200'].hex,
          },
          on: {
            bg: color.green['200'].hex,
          },
        },
      },
    },
  },
  input: {
    tones: {
      default: {
        enabled: {
          bg: color.white.hex,
          fg: color.black.hex,
          border: color.blue[200].hex,
          placeholder: color.blue[600].hex,
        },
        disabled: {
          bg: color.blue[50].hex,
          fg: color.blue[500].hex,
          border: color.blue[200].hex,
          placeholder: color.blue[600].hex,
        },
        hovered: {
          bg: color.blue[50].hex,
          fg: color.blue[500].hex,
          border: color.blue[100].hex,
          placeholder: color.blue[600].hex,
        },
      },
    },
  },
}

export default themeColor
