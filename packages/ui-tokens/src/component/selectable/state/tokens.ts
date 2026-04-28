import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_colorAlias} from '../../../lib/color/_colorAlias'
import type {_DTCGTokenAlias} from '../../../lib/dtcg/types'

/** @public */
export const selectableStateTokens = {
  enabled: _defineTokens({
    selectable: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{selectable.color.enabled.bg}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{selectable.color.enabled.border}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{selectable.color.enabled.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{selectable.color.enabled.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{selectable.color.enabled.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{selectable.color.enabled.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),

  hovered: _defineTokens({
    selectable: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{selectable.color.hovered.bg}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{selectable.color.hovered.border}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{selectable.color.hovered.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{selectable.color.hovered.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{selectable.color.hovered.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{selectable.color.hovered.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),

  pressed: _defineTokens({
    selectable: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{selectable.color.pressed.bg}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{selectable.color.pressed.border}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{selectable.color.pressed.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{selectable.color.pressed.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{selectable.color.pressed.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{selectable.color.pressed.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),

  selected: _defineTokens({
    selectable: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{selectable.color.selected.bg}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{selectable.color.selected.border}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{selectable.color.selected.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{selectable.color.selected.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{selectable.color.selected.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{selectable.color.selected.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),

  disabled: _defineTokens({
    selectable: {
      color: _defineTokenGroup({
        $type: 'color',

        bg: _colorAlias('{selectable.color.disabled.bg}', {scopes: ['fill/frame', 'fill/shape']}),
        border: _colorAlias('{selectable.color.disabled.border}', {scopes: ['stroke/color']}),
        fg: _colorAlias('{selectable.color.disabled.fg}', {
          scopes: ['fill/text', 'fill/shape', 'stroke/color'],
        }),
        muted: {
          bg: _colorAlias('{selectable.color.disabled.muted.bg}', {
            scopes: ['fill/frame', 'fill/shape'],
          }),
          border: _colorAlias('{selectable.color.disabled.muted.border}', {
            scopes: ['stroke/color'],
          }),
          fg: _colorAlias('{selectable.color.disabled.muted.fg}', {
            scopes: ['fill/text', 'fill/shape', 'stroke/color'],
          }),
        },
      }),
    },
  }),
}
