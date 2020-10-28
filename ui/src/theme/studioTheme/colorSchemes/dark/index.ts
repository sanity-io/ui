import {black, hues} from '@sanity/color'
import {ThemeColor} from '../../../types'
import {buildSyntaxColor} from '../../buildSyntaxColor'
import {card} from './card'
import {buildButtonDefaultMode, buildButtonGhostMode, buildButtonBleedMode} from './helpers'

const themeColor: ThemeColor = {
  avatar: {
    gray: hues.gray[600].hex,
    blue: hues.blue[600].hex,
    cyan: hues.cyan[600].hex,
    green: hues.green[600].hex,
    yellow: hues.yellow[600].hex,
    orange: hues.orange[600].hex,
    red: hues.red[600].hex,
    magenta: hues.magenta[600].hex,
    purple: hues.purple[600].hex,
  },

  // todo
  badge: {
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
  card,
  input: {
    tones: {
      default: {
        enabled: {
          bg: black.hex,
          fg: hues.gray[50].hex,
          border: hues.gray[800].hex,
          placeholder: hues.gray[600].hex,
        },
        disabled: {
          bg: hues.gray[900].hex,
          fg: hues.gray[500].hex,
          border: hues.gray[800].hex,
          placeholder: hues.gray[600].hex,
        },
        hovered: {
          bg: black.hex,
          fg: hues.gray[50].hex,
          border: hues.gray[700].hex,
          placeholder: hues.gray[600].hex,
        },
      },
    },
  },
  syntax: {
    tones: {
      default: buildSyntaxColor('400', '600'),
    },
  },
  switch: {
    tones: {
      default: {
        enabled: {
          thumb: black.hex,
          off: {
            bg: hues.gray['500'].hex,
          },
          on: {
            bg: hues.green['500'].hex,
          },
        },
        disabled: {
          thumb: hues.gray['950'].hex,
          off: {
            bg: hues.gray['800'].hex,
          },
          on: {
            bg: hues.green['800'].hex,
          },
        },
      },
    },
  },
}

export default themeColor
