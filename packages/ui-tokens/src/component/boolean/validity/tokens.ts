import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const booleanValidityTokens = {
  valid: _defineTokens({
    boolean: {
      color: _defineTokenGroup({
        $type: 'color',

        unchecked: {
          enabled: {
            bg: _colorAlias('{boolean.color.valid.unchecked.enabled.bg}'),
            border: _colorAlias('{boolean.color.valid.unchecked.enabled.border}'),
            fg: _colorAlias('{boolean.color.valid.unchecked.enabled.fg}'),
          },

          hovered: {
            bg: _colorAlias('{boolean.color.valid.unchecked.hovered.bg}'),
            border: _colorAlias('{boolean.color.valid.unchecked.hovered.border}'),
            fg: _colorAlias('{boolean.color.valid.unchecked.hovered.fg}'),
          },

          disabled: {
            bg: _colorAlias('{boolean.color.valid.unchecked.disabled.bg}'),
            border: _colorAlias('{boolean.color.valid.unchecked.disabled.border}'),
            fg: _colorAlias('{boolean.color.valid.unchecked.disabled.fg}'),
          },
        },

        checked: {
          enabled: {
            bg: _colorAlias('{boolean.color.valid.checked.enabled.bg}'),
            border: _colorAlias('{boolean.color.valid.checked.enabled.border}'),
            fg: _colorAlias('{boolean.color.valid.checked.enabled.fg}'),
          },
          hovered: {
            bg: _colorAlias('{boolean.color.valid.checked.hovered.bg}'),
            border: _colorAlias('{boolean.color.valid.checked.hovered.border}'),
            fg: _colorAlias('{boolean.color.valid.checked.hovered.fg}'),
          },
          disabled: {
            bg: _colorAlias('{boolean.color.valid.checked.disabled.bg}'),
            border: _colorAlias('{boolean.color.valid.checked.disabled.border}'),
            fg: _colorAlias('{boolean.color.valid.checked.disabled.fg}'),
          },
        },
      }),
    },
  }),

  invalid: _defineTokens({
    boolean: {
      color: _defineTokenGroup({
        $type: 'color',

        unchecked: {
          enabled: {
            bg: _colorAlias('{boolean.color.invalid.unchecked.enabled.bg}'),
            border: _colorAlias('{boolean.color.invalid.unchecked.enabled.border}'),
            fg: _colorAlias('{boolean.color.invalid.unchecked.enabled.fg}'),
          },

          hovered: {
            bg: _colorAlias('{boolean.color.invalid.unchecked.hovered.bg}'),
            border: _colorAlias('{boolean.color.invalid.unchecked.hovered.border}'),
            fg: _colorAlias('{boolean.color.invalid.unchecked.hovered.fg}'),
          },

          disabled: {
            bg: _colorAlias('{boolean.color.invalid.unchecked.disabled.bg}'),
            border: _colorAlias('{boolean.color.invalid.unchecked.disabled.border}'),
            fg: _colorAlias('{boolean.color.invalid.unchecked.disabled.fg}'),
          },
        },

        checked: {
          enabled: {
            bg: _colorAlias('{boolean.color.invalid.checked.enabled.bg}'),
            border: _colorAlias('{boolean.color.invalid.checked.enabled.border}'),
            fg: _colorAlias('{boolean.color.invalid.checked.enabled.fg}'),
          },
          hovered: {
            bg: _colorAlias('{boolean.color.invalid.checked.hovered.bg}'),
            border: _colorAlias('{boolean.color.invalid.checked.hovered.border}'),
            fg: _colorAlias('{boolean.color.invalid.checked.hovered.fg}'),
          },
          disabled: {
            bg: _colorAlias('{boolean.color.invalid.checked.disabled.bg}'),
            border: _colorAlias('{boolean.color.invalid.checked.disabled.border}'),
            fg: _colorAlias('{boolean.color.invalid.checked.disabled.fg}'),
          },
        },
      }),
    },
  }),
} as const
