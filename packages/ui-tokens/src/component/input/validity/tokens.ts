import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const inputValidityTokens = {
  valid: _defineTokens({
    input: {
      color: _defineTokenGroup({
        $type: 'color',

        enabled: {
          bg: _colorAlias('{input.color.valid.enabled.bg}'),
          border: _colorAlias('{input.color.valid.enabled.border}'),
          fg: _colorAlias('{input.color.valid.enabled.fg}'),
          muted: {
            bg: _colorAlias('{input.color.valid.enabled.muted.bg}'),
            fg: _colorAlias('{input.color.valid.enabled.muted.fg}'),
          },
        },

        hovered: {
          bg: _colorAlias('{input.color.valid.hovered.bg}'),
          border: _colorAlias('{input.color.valid.hovered.border}'),
          fg: _colorAlias('{input.color.valid.hovered.fg}'),
          muted: {
            bg: _colorAlias('{input.color.valid.hovered.muted.bg}'),
            fg: _colorAlias('{input.color.valid.hovered.muted.fg}'),
          },
        },

        disabled: {
          bg: _colorAlias('{input.color.valid.disabled.bg}'),
          border: _colorAlias('{input.color.valid.disabled.border}'),
          fg: _colorAlias('{input.color.valid.disabled.fg}'),
          muted: {
            bg: _colorAlias('{input.color.valid.disabled.muted.bg}'),
            fg: _colorAlias('{input.color.valid.disabled.muted.fg}'),
          },
        },
      }),
    },
  }),

  invalid: _defineTokens({
    input: {
      color: _defineTokenGroup({
        $type: 'color',

        enabled: {
          bg: _colorAlias('{input.color.invalid.enabled.bg}'),
          border: _colorAlias('{input.color.invalid.enabled.border}'),
          fg: _colorAlias('{input.color.invalid.enabled.fg}'),
          muted: {
            bg: _colorAlias('{input.color.invalid.enabled.muted.bg}'),
            fg: _colorAlias('{input.color.invalid.enabled.muted.fg}'),
          },
        },

        hovered: {
          bg: _colorAlias('{input.color.invalid.hovered.bg}'),
          border: _colorAlias('{input.color.invalid.hovered.border}'),
          fg: _colorAlias('{input.color.invalid.hovered.fg}'),
          muted: {
            bg: _colorAlias('{input.color.invalid.hovered.muted.bg}'),
            fg: _colorAlias('{input.color.invalid.hovered.muted.fg}'),
          },
        },

        disabled: {
          bg: _colorAlias('{input.color.invalid.disabled.bg}'),
          border: _colorAlias('{input.color.invalid.disabled.border}'),
          fg: _colorAlias('{input.color.invalid.disabled.fg}'),
          muted: {
            bg: _colorAlias('{input.color.invalid.disabled.muted.bg}'),
            fg: _colorAlias('{input.color.invalid.disabled.muted.fg}'),
          },
        },
      }),
    },
  }),
}
