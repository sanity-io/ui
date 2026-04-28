import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const buttonStateTokens = {
  enabled: _defineTokens({
    button: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{button.color.enabled.bg}', {
          scopes: ['fill/frame', 'fill/shape'],
        }),
        border: _colorAlias('{button.color.enabled.border}', {
          scopes: ['stroke/color'],
        }),
        fg: _colorAlias('{button.color.enabled.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{button.color.enabled.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{button.color.enabled.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{button.color.enabled.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),
  hovered: _defineTokens({
    button: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{button.color.hovered.bg}', {
          scopes: ['fill/frame', 'fill/shape'],
        }),
        border: _colorAlias('{button.color.hovered.border}', {
          scopes: ['stroke/color'],
        }),
        fg: _colorAlias('{button.color.hovered.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{button.color.hovered.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{button.color.hovered.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{button.color.hovered.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),
  pressed: _defineTokens({
    button: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{button.color.pressed.bg}', {
          scopes: ['fill/frame', 'fill/shape'],
        }),
        border: _colorAlias('{button.color.pressed.border}', {
          scopes: ['stroke/color'],
        }),
        fg: _colorAlias('{button.color.pressed.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{button.color.pressed.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{button.color.pressed.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{button.color.pressed.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),
  disabled: _defineTokens({
    button: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{button.color.disabled.bg}', {
          scopes: ['fill/frame', 'fill/shape'],
        }),
        border: _colorAlias('{button.color.disabled.border}', {
          scopes: ['stroke/color'],
        }),
        fg: _colorAlias('{button.color.disabled.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{button.color.disabled.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{button.color.disabled.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{button.color.disabled.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),
}
