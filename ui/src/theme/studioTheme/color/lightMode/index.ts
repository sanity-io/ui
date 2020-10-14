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
    gray: color.gray[400].hex,
    blue: color.blue[400].hex,
    cyan: color.cyan[400].hex,
    green: color.green[400].hex,
    yellow: color.yellow[400].hex,
    orange: color.orange[400].hex,
    red: color.red[400].hex,
    magenta: color.magenta[400].hex,
    purple: color.purple[400].hex,
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
  },
  input: {
    tones: {
      default: {
        enabled: {
          bg: color.white.hex,
          fg: color.black.hex,
          border: color.gray[200].hex,
          placeholder: color.gray[400].hex,
        },
        disabled: {
          bg: color.gray[50].hex,
          fg: color.gray[200].hex,
          border: color.gray[200].hex,
          placeholder: 'transparent',
        },
        hovered: {
          bg: color.white.hex,
          fg: color.black.hex,
          border: color.gray[300].hex,
          placeholder: color.gray[500].hex,
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
}

export default themeColor
