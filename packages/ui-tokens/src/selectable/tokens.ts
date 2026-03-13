import {_colorAlias} from '../color/lib/_colorAlias'
import {_defineTokenGroup} from '../lib/_defineTokenGroup'
import {_defineTokens} from '../lib/_defineTokens'
import type {_DTCGTokenAlias} from '../lib/dtcg/types'

/** @public */
export const selectableTokens = _defineTokens({
  selectable: {
    color: _defineTokenGroup({
      $type: 'color',

      state: {
        enabled: {
          bg: _colorAlias('{color.tinted.bg.0}'),
          border: _colorAlias('{color.tinted.border.2}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            border: _colorAlias('{color.tinted.border.3}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },

        hovered: {
          bg: _colorAlias('{color.tinted.bg.1}'),
          border: _colorAlias('{color.tinted.border.3}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.2}'),
            border: _colorAlias('{color.tinted.border.4}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },

        pressed: {
          bg: _colorAlias('{color.tinted.bg.2}'),
          border: _colorAlias('{color.tinted.border.4}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.3}'),
            border: _colorAlias('{color.tinted.border.4}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },

        selected: {
          bg: _colorAlias('{color.solid.primary.bg.0}'),
          border: _colorAlias('{color.solid.primary.border.2}'),
          fg: _colorAlias('{color.solid.primary.fg.0}'),
          muted: {
            bg: _colorAlias('{color.solid.primary.bg.1}'),
            border: _colorAlias('{color.solid.primary.border.1}'),
            fg: _colorAlias('{color.solid.primary.fg.4}'),
          },
        },

        disabled: {
          bg: _colorAlias('{color.tinted.bg.0}'),
          border: _colorAlias('{color.tinted.border.0}'),
          fg: _colorAlias('{color.tinted.border.3}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            border: _colorAlias('{color.tinted.bg.0}'),
            fg: _colorAlias('{color.tinted.border.2}'),
          },
        },
      },
    }),
  },
})
