import type {DTCGShadowToken} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {ColorStateTokens} from '../_shared/types'
import {_colorAlias} from '../color/color'
import type {TokenCollection} from '../types'
import type {ButtonMode} from './types'

export const BUTTON_MODE_NAMESPACE = '_buttonMode'

export interface ButtonModeCollectionTokens {
  [BUTTON_MODE_NAMESPACE]: {
    boxShadow: DTCGShadowToken
    color: {
      state: {
        enabled: ColorStateTokens
        hovered: ColorStateTokens
        pressed: ColorStateTokens
        selected: ColorStateTokens
        disabled: ColorStateTokens
      }
    }
  }
}

export type ButtonModeCollection = TokenCollection<
  typeof BUTTON_MODE_NAMESPACE,
  ButtonMode,
  ButtonModeCollectionTokens
>

export const _buttonModeCollection: ButtonModeCollection = {
  namespace: BUTTON_MODE_NAMESPACE,
  title: 'Button mode',
  modes: {
    default: {
      [BUTTON_MODE_NAMESPACE]: {
        boxShadow: {
          $type: 'shadow',
          $value: '{shadow.0}',
        },
        color: {
          state: {
            enabled: {
              bg: _colorAlias('solid.bg.0'),
              border: _colorAlias('solid.border.2'),
              fg: _colorAlias('solid.fg.0'),
              muted: {
                bg: _colorAlias('solid.bg.1'),
                border: _colorAlias('solid.border.1'),
                fg: _colorAlias('solid.fg.4'),
              },
            },

            hovered: {
              bg: _colorAlias('solid.bg.1'),
              border: _colorAlias('solid.border.3'),
              fg: _colorAlias('solid.fg.0'),
              muted: {
                bg: _colorAlias('solid.bg.2'),
                border: _colorAlias('solid.border.2'),
                fg: _colorAlias('solid.fg.4'),
              },
            },

            pressed: {
              bg: _colorAlias('solid.bg.2'),
              border: _colorAlias('solid.border.4'),
              fg: _colorAlias('solid.fg.0'),
              muted: {
                bg: _colorAlias('solid.bg.3'),
                border: _colorAlias('solid.border.3'),
                fg: _colorAlias('solid.fg.4'),
              },
            },

            selected: {
              bg: _colorAlias('solid.bg.2'),
              border: _colorAlias('solid.border.4'),
              fg: _colorAlias('solid.fg.0'),
              muted: {
                bg: _colorAlias('solid.bg.3'),
                border: _colorAlias('solid.border.3'),
                fg: _colorAlias('solid.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.default.border.3'),
              border: _colorAlias('tinted.default.border.2'),
              fg: _colorAlias('tinted.default.bg.0'),
              muted: {
                bg: _colorAlias('tinted.default.border.3'),
                border: _colorAlias('tinted.default.border.2'),
                fg: _colorAlias('tinted.default.bg.0'),
              },
            },
          },
        },
      },
    },

    ghost: {
      [BUTTON_MODE_NAMESPACE]: {
        boxShadow: {
          $type: 'shadow',
          $value: [
            {
              color: {
                colorSpace: 'srgb',
                components: [0, 0, 0],
                alpha: 0.06,
              },
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: -2, unit: 'px'},
              blur: {value: 0.5, unit: 'px'},
              spread: '{border.1}',
              inset: true,
            },
            {
              color: '{color.shadow.outline}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: '{border.1}',
              inset: true,
            },
          ],
        },
        color: {
          state: {
            enabled: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.2'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                border: _colorAlias('tinted.border.1'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            hovered: {
              bg: _colorAlias('tinted.bg.1'),
              border: _colorAlias('tinted.border.3'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.2'),
                border: _colorAlias('tinted.border.2'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            pressed: {
              bg: _colorAlias('tinted.bg.2'),
              border: _colorAlias('tinted.border.4'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.3'),
                border: _colorAlias('tinted.border.3'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            selected: {
              bg: _colorAlias('tinted.bg.2'),
              border: _colorAlias('tinted.border.4'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.3'),
                border: _colorAlias('tinted.border.4'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.default.bg.0'),
              border: _colorAlias('tinted.default.border.0'),
              fg: _colorAlias('tinted.default.border.4'),
              muted: {
                bg: _colorAlias('tinted.default.bg.1'),
                border: _colorAlias('tinted.default.border.0'),
                fg: _colorAlias('tinted.default.border.2'),
              },
            },
          },
        },
      },
    },

    bleed: {
      [BUTTON_MODE_NAMESPACE]: {
        boxShadow: {
          $type: 'shadow',
          $value: '{shadow.0}',
        },
        color: {
          state: {
            enabled: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.2'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                border: _colorAlias('tinted.border.1'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            hovered: {
              bg: _colorAlias('tinted.bg.1'),
              border: _colorAlias('tinted.border.3'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.2'),
                border: _colorAlias('tinted.border.2'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            pressed: {
              bg: _colorAlias('tinted.bg.2'),
              border: _colorAlias('tinted.border.4'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.3'),
                border: _colorAlias('tinted.border.3'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            selected: {
              bg: _colorAlias('tinted.bg.2'),
              border: _colorAlias('tinted.border.4'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.3'),
                border: _colorAlias('tinted.border.4'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.default.bg.0'),
              border: _colorAlias('tinted.default.border.0'),
              fg: _colorAlias('tinted.default.border.4'),
              muted: {
                bg: _colorAlias('tinted.default.bg.1'),
                border: _colorAlias('tinted.default.border.0'),
                fg: _colorAlias('tinted.default.border.2'),
              },
            },
          },
        },
      },
    },
  },
}
