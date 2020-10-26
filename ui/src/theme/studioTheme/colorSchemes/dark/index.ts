import {color} from '@sanity/color'
import {ThemeColor} from '../../../types'
import {buildSyntaxColor} from '../../buildSyntaxColor'
import {card} from './card'
import {buildButtonDefaultMode, buildButtonGhostMode, buildButtonBleedMode} from './helpers'

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
  card,
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
      default: buildSyntaxColor('100', '100'),
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
