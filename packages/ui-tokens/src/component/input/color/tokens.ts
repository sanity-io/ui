import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const inputColorTokens = _defineTokens({
  input: {
    color: _defineTokenGroup({
      $type: 'color',

      valid: {
        enabled: {
          bg: _colorAlias('{color.tinted.bg.0}'),
          border: _colorAlias('{color.tinted.border.1}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },

        hovered: {
          bg: _colorAlias('{color.tinted.bg.0}'),
          border: _colorAlias('{color.tinted.border.4}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },

        disabled: {
          bg: _colorAlias('{color.tinted.bg.1}'),
          border: _colorAlias('{color.tinted.border.0}'),
          fg: _colorAlias('{color.tinted.border.3}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.2}'),
            fg: _colorAlias('{color.tinted.border.2}'),
          },
        },
      },

      invalid: {
        enabled: {
          bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          border: _colorAlias('{_tone.color.tinted.critical.border.1}'),
          fg: _colorAlias('{_tone.color.tinted.critical.fg.4}'),
          muted: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.2}'),
            fg: _colorAlias('{_tone.color.tinted.critical.fg.4}'),
          },
        },

        hovered: {
          bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          border: _colorAlias('{_tone.color.tinted.critical.border.4}'),
          fg: _colorAlias('{_tone.color.tinted.critical.fg.0}'),
          muted: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.2}'),
            fg: _colorAlias('{_tone.color.tinted.critical.fg.4}'),
          },
        },

        disabled: {
          bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          border: _colorAlias('{_tone.color.tinted.critical.border.0}'),
          fg: _colorAlias('{_tone.color.tinted.critical.border.3}'),
          muted: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.2}'),
            fg: _colorAlias('{_tone.color.tinted.critical.border.2}'),
          },
        },
      },
    }),
  },
})
