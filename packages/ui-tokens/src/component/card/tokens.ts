import {_defineToken} from '../../lib/_defineToken'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_colorAlias} from '../../lib/color/_colorAlias'

/** @public */
export const cardTokens = _defineTokens({
  card: {
    color: _defineTokenGroup({
      $type: 'color',
      hovered: {
        bg: _colorAlias('{color.tinted.bg.1}'),
        border: _colorAlias('{color.tinted.border.3}'),
        fg: _colorAlias('{color.tinted.fg.0}'),
        muted: {
          bg: _colorAlias('{color.tinted.bg.2}'),
          border: _colorAlias('{color.tinted.border.2}'),
          fg: _colorAlias('{color.tinted.fg.4}'),
        },
      },
      pressed: {
        bg: _colorAlias('{color.tinted.bg.2}'),
        border: _colorAlias('{color.tinted.border.4}'),
        fg: _colorAlias('{color.tinted.fg.0}'),
        muted: {
          bg: _colorAlias('{color.tinted.bg.3}'),
          border: _colorAlias('{color.tinted.border.3}'),
          fg: _colorAlias('{color.tinted.fg.4}'),
        },
      },
      selected: {
        bg: _colorAlias('{color._cardTone.solid.primary.bg.0}'),
        border: _colorAlias('{color._cardTone.solid.primary.border.2}'),
        fg: _colorAlias('{color._cardTone.solid.primary.fg.0}'),
        muted: {
          bg: _colorAlias('{color._cardTone.solid.primary.bg.1}'),
          border: _colorAlias('{color._cardTone.solid.primary.border.1}'),
          fg: _colorAlias('{color._cardTone.solid.primary.fg.4}'),
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
    }),
    focusRing: _defineToken({
      $type: 'shadow',
      $value: {
        color: '{color.focusRing}',
        offsetX: {value: 0, unit: 'px'},
        offsetY: {value: 0, unit: 'px'},
        blur: {value: 0, unit: 'px'},
        spread: '{border.2}',
        inset: true,
      },
    }),
    outline: _defineToken({
      $type: 'dimension',
      $value: '{border.1}',
    }),
  },
})
