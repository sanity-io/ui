import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_colorAlias} from '../../lib/color/_colorAlias'
import type {_DTCGTokenAlias} from '../../lib/dtcg/types'

/** @public */
export const selectableTokens = _defineTokens({
  selectable: {
    color: _defineTokenGroup({
      $type: 'color',

      enabled: {
        bg: _colorAlias('{color.tinted.bg.0}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{color.tinted.border.2}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{color.tinted.fg.0}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame', 'fill/shape']}),
          border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
          fg: _colorAlias('{color.tinted.fg.4}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      },

      hovered: {
        bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{color.tinted.fg.0}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame', 'fill/shape']}),
          border: _colorAlias('{color.tinted.border.4}', {scopes: ['stroke/color']}),
          fg: _colorAlias('{color.tinted.fg.4}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      },

      pressed: {
        bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{color.tinted.border.4}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{color.tinted.fg.0}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame', 'fill/shape']}),
          border: _colorAlias('{color.tinted.border.4}', {scopes: ['stroke/color']}),
          fg: _colorAlias('{color.tinted.fg.4}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      },

      selected: {
        bg: _colorAlias('{color._cardTone.solid.primary.bg.0}', {
          scopes: ['fill/frame', 'fill/shape'],
        }),
        border: _colorAlias('{color._cardTone.solid.primary.border.2}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{color._cardTone.solid.primary.fg.0}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{color._cardTone.solid.primary.bg.1}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{color._cardTone.solid.primary.border.1}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{color._cardTone.solid.primary.fg.4}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      },

      disabled: {
        bg: _colorAlias('{color.tinted.bg.0}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{color.tinted.border.0}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{color.tinted.border.3}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame', 'fill/shape']}),
          border: _colorAlias('{color.tinted.bg.0}', {scopes: ['stroke/color']}),
          fg: _colorAlias('{color.tinted.border.2}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      },
    }),
  },
})
