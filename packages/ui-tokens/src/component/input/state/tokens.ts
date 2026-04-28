import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const inputStateTokens = {
  enabled: _defineTokens({
    input: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{input.color.enabled.bg}'),
        border: _colorAlias('{input.color.enabled.border}'),
        fg: _colorAlias('{input.color.enabled.fg}'),
        muted: {
          bg: _colorAlias('{input.color.enabled.muted.bg}'),
          fg: _colorAlias('{input.color.enabled.muted.fg}'),
        },
      }),
    },
  }),

  hovered: _defineTokens({
    input: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{input.color.hovered.bg}'),
        border: _colorAlias('{input.color.hovered.border}'),
        fg: _colorAlias('{input.color.hovered.fg}'),
        muted: {
          bg: _colorAlias('{input.color.hovered.muted.bg}'),
          fg: _colorAlias('{input.color.hovered.muted.fg}'),
        },
      }),
    },
  }),

  disabled: _defineTokens({
    input: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{input.color.disabled.bg}'),
        border: _colorAlias('{input.color.disabled.border}'),
        fg: _colorAlias('{input.color.disabled.fg}'),
        muted: {
          bg: _colorAlias('{input.color.disabled.muted.bg}'),
          fg: _colorAlias('{input.color.disabled.muted.fg}'),
        },
      }),
    },
  }),
}
