import {ThemeColorButton} from '../../../types'
import {buildButtonDefaultMode, buildButtonGhostMode, buildButtonBleedMode} from './helpers'

export const button: ThemeColorButton = {
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
}
