import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_px} from '../../../lib/_px'
import {_colorAlias} from '../../../lib/color/_colorAlias'
import type {SanityTokenScope} from '../../../lib/sanity/types'

const scopes = {
  bg: ['fill/frame', 'fill/shape'] satisfies SanityTokenScope[],
  border: ['stroke/color'] satisfies SanityTokenScope[],
  fg: ['fill/text', 'fill/shape', 'stroke/color'] satisfies SanityTokenScope[],
} as const

/** @public */
export const booleanStateTokens = {
  enabled: _defineTokens({
    boolean: {
      color: _defineTokenGroup({
        $type: 'color',

        unchecked: {
          bg: _colorAlias('{boolean.color.unchecked.enabled.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.unchecked.enabled.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.unchecked.enabled.fg}', {
            scopes: scopes.fg,
          }),
        },
        checked: {
          bg: _colorAlias('{boolean.color.checked.enabled.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.checked.enabled.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.checked.enabled.fg}', {
            scopes: scopes.fg,
          }),
        },
      }),
    },
  }),

  hovered: _defineTokens({
    boolean: {
      color: _defineTokenGroup({
        $type: 'color',

        unchecked: {
          bg: _colorAlias('{boolean.color.unchecked.hovered.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.unchecked.hovered.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.unchecked.hovered.fg}', {
            scopes: scopes.fg,
          }),
        },
        checked: {
          bg: _colorAlias('{boolean.color.checked.hovered.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.checked.hovered.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.checked.hovered.fg}', {
            scopes: scopes.fg,
          }),
        },
      }),
    },
  }),

  disabled: _defineTokens({
    boolean: {
      color: _defineTokenGroup({
        $type: 'color',

        unchecked: {
          bg: _colorAlias('{boolean.color.unchecked.disabled.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.unchecked.disabled.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.unchecked.disabled.fg}', {
            scopes: scopes.fg,
          }),
        },
        checked: {
          bg: _colorAlias('{boolean.color.checked.disabled.bg}', {
            scopes: scopes.bg,
          }),
          border: _colorAlias('{boolean.color.checked.disabled.border}', {
            scopes: scopes.border,
          }),
          fg: _colorAlias('{boolean.color.checked.disabled.fg}', {
            scopes: scopes.fg,
          }),
        },
      }),
    },
  }),
}
