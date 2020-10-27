import {black, hues, white} from '@sanity/color'
import {ThemeColor} from '../../../types'
import {buildSyntaxColor} from '../../buildSyntaxColor'
import {card} from './card'
import {buildButtonDefaultMode, buildButtonGhostMode, buildButtonBleedMode} from './helpers'

const themeColor: ThemeColor = {
  avatar: {
    gray: hues.gray[400].hex,
    blue: hues.blue[400].hex,
    cyan: hues.cyan[400].hex,
    green: hues.green[400].hex,
    yellow: hues.yellow[400].hex,
    orange: hues.orange[400].hex,
    red: hues.red[400].hex,
    magenta: hues.magenta[400].hex,
    purple: hues.purple[400].hex,
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
          bg: white.hex,
          fg: black.hex,
          border: hues.gray[200].hex,
          placeholder: hues.gray[400].hex,
        },
        disabled: {
          bg: hues.gray[50].hex,
          fg: hues.gray[200].hex,
          border: hues.gray[200].hex,
          placeholder: 'transparent',
        },
        hovered: {
          bg: white.hex,
          fg: black.hex,
          border: hues.gray[300].hex,
          placeholder: hues.gray[500].hex,
        },
      },
    },
  },
  syntax: {
    tones: {
      default: buildSyntaxColor('600', '500'),
    },
  },
  switch: {
    tones: {
      default: {
        enabled: {
          thumb: white.hex,
          off: {
            bg: hues.gray['500'].hex,
          },
          on: {
            bg: hues.green['500'].hex,
          },
        },
        disabled: {
          thumb: hues.gray['50'].hex,
          off: {
            bg: hues.gray['200'].hex,
          },
          on: {
            bg: hues.green['200'].hex,
          },
        },
      },
    },
  },
}

export default themeColor
