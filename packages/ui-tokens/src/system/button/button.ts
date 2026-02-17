import type {DTCGShadowToken} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {ColorStateTokens} from '../_shared/types'
import {_colorAlias} from '../color/color'
import type {TokenCollection} from '../types'
import type {ButtonMode} from './types'

export const BUTTON_NAMESPACE = 'button'

export interface ButtonCollectionTokens {
  [BUTTON_NAMESPACE]: {
    border: {
      width: SanityDimensionToken
    }
    focusRing: DTCGShadowToken
    color: Record<
      ButtonMode,
      {
        state: {
          enabled: ColorStateTokens
          hovered: ColorStateTokens
          pressed: ColorStateTokens
          selected: ColorStateTokens
          disabled: ColorStateTokens
        }
      }
    >
  }
}

export type ButtonCollection = TokenCollection<
  typeof BUTTON_NAMESPACE,
  'default',
  ButtonCollectionTokens
>

export const buttonCollection: ButtonCollection = {
  namespace: BUTTON_NAMESPACE,
  title: 'Button',
  modes: {
    default: {
      [BUTTON_NAMESPACE]: {
        border: {
          width: {
            $type: 'dimension',
            $value: '{border.1}',
            $extensions: {
              'io.sanity': {
                scopes: ['stroke/float'],
              },
            },
          },
        },
        focusRing: {
          $type: 'shadow',
          $value: [
            {
              color: '{color.bg}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: {value: 1, unit: 'px'},
              // inset: true,
            },
            {
              color: '{color.focusRing}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: {value: 2, unit: 'px'},
            },
          ],
        },

        color: {
          default: {
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
                bg: _colorAlias('tinted.default.bg.4'),
                border: _colorAlias('tinted.default.border.0'),
                fg: _colorAlias('tinted.default.bg.0'),
                muted: {
                  bg: _colorAlias('tinted.default.bg.4'),
                  border: _colorAlias('tinted.default.border.0'),
                  fg: _colorAlias('tinted.default.bg.0'),
                },
              },
            },
          },

          ghost: {
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
                  border: _colorAlias('tinted.border.4'),
                  fg: _colorAlias('tinted.fg.4'),
                },
              },

              pressed: {
                bg: _colorAlias('tinted.bg.2'),
                border: _colorAlias('tinted.border.4'),
                fg: _colorAlias('tinted.fg.0'),
                muted: {
                  bg: _colorAlias('tinted.bg.3'),
                  border: _colorAlias('tinted.border.4'),
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
                  border: _colorAlias('tinted.default.border.2'),
                  fg: _colorAlias('tinted.default.border.4'),
                },
              },
            },
          },

          bleed: {
            state: {
              enabled: {
                bg: _colorAlias('tinted.bg.0'),
                border: _colorAlias('tinted.border.2'),
                fg: _colorAlias('tinted.fg.0'),
                muted: {
                  bg: _colorAlias('tinted.bg.0'),
                  border: _colorAlias('tinted.border.2'),
                  fg: _colorAlias('tinted.fg.0'),
                },
              },

              hovered: {
                bg: _colorAlias('tinted.bg.1'),
                border: _colorAlias('tinted.border.3'),
                fg: _colorAlias('tinted.fg.0'),
                muted: {
                  bg: _colorAlias('tinted.bg.1'),
                  border: _colorAlias('tinted.border.3'),
                  fg: _colorAlias('tinted.fg.0'),
                },
              },

              pressed: {
                bg: _colorAlias('tinted.bg.2'),
                border: _colorAlias('tinted.border.4'),
                fg: _colorAlias('tinted.fg.0'),
                muted: {
                  bg: _colorAlias('tinted.bg.2'),
                  border: _colorAlias('tinted.border.4'),
                  fg: _colorAlias('tinted.fg.0'),
                },
              },

              selected: {
                bg: _colorAlias('tinted.bg.2'),
                border: _colorAlias('tinted.border.4'),
                fg: _colorAlias('tinted.fg.0'),
                muted: {
                  bg: _colorAlias('tinted.bg.2'),
                  border: _colorAlias('tinted.border.4'),
                  fg: _colorAlias('tinted.fg.0'),
                },
              },

              disabled: {
                bg: _colorAlias('tinted.default.bg.0'),
                border: _colorAlias('tinted.default.border.0'),
                fg: _colorAlias('tinted.default.border.3'),
                muted: {
                  bg: _colorAlias('tinted.default.bg.1'),
                  border: _colorAlias('tinted.default.border.2'),
                  fg: _colorAlias('tinted.default.border.2'),
                },
              },
            },
          },
        },
      },
    },
  },
}
