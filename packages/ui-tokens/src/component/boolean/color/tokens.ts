import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const booleanColorTokens = _defineTokens({
  boolean: {
    color: _defineTokenGroup({
      $type: 'color',
      valid: {
        unchecked: {
          enabled: {
            bg: _colorAlias('{color.tinted.bg.0}'),
            border: _colorAlias('{color.tinted.border.2}'),
            fg: _colorAlias('{color.tinted.fg.0}'),
          },

          hovered: {
            bg: _colorAlias('{color.tinted.bg.0}'),
            border: _colorAlias('{color.tinted.border.4}'),
            fg: _colorAlias('{color.tinted.fg.0}'),
          },

          disabled: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            border: _colorAlias('{color.tinted.border.0}'),
            fg: _colorAlias('{color.tinted.border.4}'),
          },
        },

        checked: {
          enabled: {
            bg: _colorAlias('{color.tinted.fg.0}'),
            border: _colorAlias('{color.tinted.fg.0}'),
            fg: _colorAlias('{color.tinted.bg.0}'),
          },
          hovered: {
            bg: _colorAlias('{color.tinted.fg.1}'),
            border: _colorAlias('{color.tinted.fg.1}'),
            fg: _colorAlias('{color.tinted.bg.0}'),
          },
          disabled: {
            bg: _colorAlias('{color.tinted.border.3}'),
            border: _colorAlias('{color.tinted.border.3}'),
            fg: _colorAlias('{color.tinted.bg.1}'),
          },
        },
      },

      invalid: {
        unchecked: {
          enabled: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
            border: _colorAlias('{_tone.color.tinted.critical.border.2}'),
            fg: _colorAlias('{_tone.color.tinted.critical.fg.2}'),
          },

          hovered: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
            border: _colorAlias('{_tone.color.tinted.critical.border.4}'),
            fg: _colorAlias('{_tone.color.tinted.critical.fg.2}'),
          },

          disabled: {
            bg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
            border: _colorAlias('{_tone.color.tinted.critical.border.0}'),
            fg: _colorAlias('{_tone.color.tinted.critical.border.3}'),
          },
        },

        checked: {
          enabled: {
            bg: _colorAlias('{_tone.color.tinted.critical.fg.2}'),
            border: _colorAlias('{_tone.color.tinted.critical.fg.2}'),
            fg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          },
          hovered: {
            bg: _colorAlias('{_tone.color.tinted.critical.fg.1}'),
            border: _colorAlias('{_tone.color.tinted.critical.fg.1}'),
            fg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          },
          disabled: {
            bg: _colorAlias('{_tone.color.tinted.critical.border.3}'),
            border: _colorAlias('{_tone.color.tinted.critical.border.3}'),
            fg: _colorAlias('{_tone.color.tinted.critical.bg.1}'),
          },
        },
      },
    }),
  },
})
