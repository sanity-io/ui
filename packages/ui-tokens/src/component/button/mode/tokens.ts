import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const buttonModeTokens = {
  default: _defineTokens({
    button: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: '{shadow.0}',
      }),
      color: _defineTokenGroup({
        $type: 'color',
        enabled: {
          bg: _colorAlias('{color.solid.bg.0}'),
          border: _colorAlias('{color.solid.border.2}'),
          fg: _colorAlias('{color.solid.fg.0}'),
          muted: {
            bg: _colorAlias('{color.solid.bg.1}'),
            border: _colorAlias('{color.solid.border.1}'),
            fg: _colorAlias('{color.solid.fg.4}'),
          },
        },
        hovered: {
          bg: _colorAlias('{color.solid.bg.1}'),
          border: _colorAlias('{color.solid.border.3}'),
          fg: _colorAlias('{color.solid.fg.0}'),
          muted: {
            bg: _colorAlias('{color.solid.bg.2}'),
            border: _colorAlias('{color.solid.border.2}'),
            fg: _colorAlias('{color.solid.fg.4}'),
          },
        },
        pressed: {
          bg: _colorAlias('{color.solid.bg.2}'),
          border: _colorAlias('{color.solid.border.4}'),
          fg: _colorAlias('{color.solid.fg.0}'),
          muted: {
            bg: _colorAlias('{color.solid.bg.3}'),
            border: _colorAlias('{color.solid.border.3}'),
            fg: _colorAlias('{color.solid.fg.4}'),
          },
        },
        disabled: {
          bg: _colorAlias('{color._cardTone.tinted.default.border.3}'),
          border: _colorAlias('{color._cardTone.tinted.default.border.2}'),
          fg: _colorAlias('{color._cardTone.tinted.default.bg.0}'),
          muted: {
            bg: _colorAlias('{color._cardTone.tinted.default.border.3}'),
            border: _colorAlias('{color._cardTone.tinted.default.border.2}'),
            fg: _colorAlias('{color._cardTone.tinted.default.bg.0}'),
          },
        },
      }),
    },
  }),
  ghost: _defineTokens({
    button: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: [
          {
            color: _colorAlias('{button.color.muted.border}').$value,
            offsetX: {value: 0, unit: 'px'},
            offsetY: {value: 0, unit: 'px'},
            blur: {value: 0, unit: 'px'},
            spread: '{border.2}',
            inset: true,
          },
        ],
      }),
      color: _defineTokenGroup({
        $type: 'color',
        enabled: {
          bg: _colorAlias('{color.tinted.bg.1}'),
          border: _colorAlias('{color.tinted.border.1}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.2}'),
            border: _colorAlias('{color.tinted.border.0}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        hovered: {
          bg: _colorAlias('{color.tinted.bg.2}'),
          border: _colorAlias('{color.tinted.border.2}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.3}'),
            border: _colorAlias('{color.tinted.border.1}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        pressed: {
          bg: _colorAlias('{color.tinted.bg.3}'),
          border: _colorAlias('{color.tinted.border.3}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.4}'),
            border: _colorAlias('{color.tinted.border.2}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        disabled: {
          bg: _colorAlias('{color._cardTone.tinted.default.bg.0}'),
          border: _colorAlias('{color._cardTone.tinted.default.border.0}'),
          fg: _colorAlias('{color._cardTone.tinted.default.border.4}'),
          muted: {
            bg: _colorAlias('{color._cardTone.tinted.default.bg.1}'),
            border: _colorAlias('{color._cardTone.tinted.default.border.0}'),
            fg: _colorAlias('{color._cardTone.tinted.default.border.2}'),
          },
        },
      }),
    },
  }),
  bleed: _defineTokens({
    button: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: '{shadow.0}',
      }),
      color: _defineTokenGroup({
        $type: 'color',
        enabled: {
          bg: _colorAlias('{color.tinted.bg.0}'),
          border: _colorAlias('{color.tinted.border.1}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.1}'),
            border: _colorAlias('{color.tinted.border.0}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        hovered: {
          bg: _colorAlias('{color.tinted.bg.1}'),
          border: _colorAlias('{color.tinted.border.2}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.2}'),
            border: _colorAlias('{color.tinted.border.1}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        pressed: {
          bg: _colorAlias('{color.tinted.bg.2}'),
          border: _colorAlias('{color.tinted.border.3}'),
          fg: _colorAlias('{color.tinted.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.bg.3}'),
            border: _colorAlias('{color.tinted.border.2}'),
            fg: _colorAlias('{color.tinted.fg.4}'),
          },
        },
        disabled: {
          bg: _colorAlias('{color._cardTone.tinted.default.bg.0}'),
          border: _colorAlias('{color._cardTone.tinted.default.border.0}'),
          fg: _colorAlias('{color._cardTone.tinted.default.border.4}'),
          muted: {
            bg: _colorAlias('{color._cardTone.tinted.default.bg.1}'),
            border: _colorAlias('{color._cardTone.tinted.default.border.0}'),
            fg: _colorAlias('{color._cardTone.tinted.default.border.2}'),
          },
        },
      }),
    },
  }),
}
