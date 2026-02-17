import type {ColorStateTokens} from '../_shared/types'
import {_colorAlias} from '../color/color'
import type {TokenCollection, TokenTree} from '../types'

export const SELECTABLE_NAMESPACE = 'selectable'

export interface SelectableTokens extends TokenTree {
  [SELECTABLE_NAMESPACE]: {
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

export type SelectableCollection = TokenCollection<
  typeof SELECTABLE_NAMESPACE,
  'default',
  SelectableTokens
>

export const selectableCollection: SelectableCollection = {
  namespace: SELECTABLE_NAMESPACE,
  title: 'Selectable',
  modes: {
    default: {
      [SELECTABLE_NAMESPACE]: {
        color: {
          state: {
            enabled: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.2'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                border: _colorAlias('tinted.border.3'),
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
              bg: _colorAlias('solid.primary.bg.0'),
              border: _colorAlias('solid.primary.border.2'),
              fg: _colorAlias('solid.primary.fg.0'),
              muted: {
                bg: _colorAlias('solid.primary.bg.1'),
                border: _colorAlias('solid.primary.border.1'),
                fg: _colorAlias('solid.primary.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.0'),
              fg: _colorAlias('tinted.border.3'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                border: _colorAlias('tinted.bg.0'),
                fg: _colorAlias('tinted.border.2'),
              },
            },
          },
        },
      },
    },
  },
}
