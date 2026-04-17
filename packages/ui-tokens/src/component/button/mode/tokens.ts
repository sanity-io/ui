import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @internal */
export const _buttonModeTokens = {
  default: _defineTokens({
    _buttonMode: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: '{shadow.0}',
      }),
      color: _defineTokenGroup({
        $type: 'color',
        state: {
          enabled: {
            bg: _colorAlias('{color.solid.bg.0}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.solid.border.2}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.solid.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.solid.bg.1}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.solid.border.1}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.solid.fg.4}', {scopes: ['fill/text']}),
            },
          },
          hovered: {
            bg: _colorAlias('{color.solid.bg.1}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.solid.border.3}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.solid.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.solid.bg.2}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.solid.border.2}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.solid.fg.4}', {scopes: ['fill/text']}),
            },
          },
          pressed: {
            bg: _colorAlias('{color.solid.bg.2}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.solid.border.4}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.solid.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.solid.bg.3}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.solid.border.3}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.solid.fg.4}', {scopes: ['fill/text']}),
            },
          },
          selected: {
            bg: _colorAlias('{color.solid.bg.2}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.solid.border.4}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.solid.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.solid.bg.3}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.solid.border.3}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.solid.fg.4}', {scopes: ['fill/text']}),
            },
          },
          disabled: {
            bg: _colorAlias('{color._cardTone.tinted.default.border.3}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color._cardTone.tinted.default.border.2}', {
              scopes: ['stroke/color'],
            }),
            fg: _colorAlias('{color._cardTone.tinted.default.bg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color._cardTone.tinted.default.border.3}', {
                scopes: ['fill/frame'],
              }),
              border: _colorAlias('{color._cardTone.tinted.default.border.2}', {
                scopes: ['stroke/color'],
              }),
              fg: _colorAlias('{color._cardTone.tinted.default.bg.0}', {scopes: ['fill/text']}),
            },
          },
        },
      }),
    },
  }),
  ghost: _defineTokens({
    _buttonMode: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: [
          {
            color: '{color.muted.border}',
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
        state: {
          enabled: {
            bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.1}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.0}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          hovered: {
            bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.2}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.1}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          pressed: {
            bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.4}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.2}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          selected: {
            bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.4}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          disabled: {
            bg: _colorAlias('{color._cardTone.tinted.default.bg.0}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color._cardTone.tinted.default.border.0}', {
              scopes: ['stroke/color'],
            }),
            fg: _colorAlias('{color._cardTone.tinted.default.border.4}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color._cardTone.tinted.default.bg.1}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color._cardTone.tinted.default.border.0}', {
                scopes: ['stroke/color'],
              }),
              fg: _colorAlias('{color._cardTone.tinted.default.border.2}', {scopes: ['fill/text']}),
            },
          },
        },
      }),
    },
  }),
  bleed: _defineTokens({
    _buttonMode: {
      boxShadow: _defineToken({
        $type: 'shadow',
        $value: '{shadow.0}',
      }),
      color: _defineTokenGroup({
        $type: 'color',
        state: {
          enabled: {
            bg: _colorAlias('{color.tinted.bg.0}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.1}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.0}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          hovered: {
            bg: _colorAlias('{color.tinted.bg.1}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.2}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.1}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          pressed: {
            bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.2}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          selected: {
            bg: _colorAlias('{color.tinted.bg.2}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
            fg: _colorAlias('{color.tinted.fg.0}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color.tinted.bg.3}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color.tinted.border.3}', {scopes: ['stroke/color']}),
              fg: _colorAlias('{color.tinted.fg.4}', {scopes: ['fill/text']}),
            },
          },
          disabled: {
            bg: _colorAlias('{color._cardTone.tinted.default.bg.0}', {scopes: ['fill/frame']}),
            border: _colorAlias('{color._cardTone.tinted.default.border.0}', {
              scopes: ['stroke/color'],
            }),
            fg: _colorAlias('{color._cardTone.tinted.default.border.4}', {scopes: ['fill/text']}),
            muted: {
              bg: _colorAlias('{color._cardTone.tinted.default.bg.1}', {scopes: ['fill/frame']}),
              border: _colorAlias('{color._cardTone.tinted.default.border.0}', {
                scopes: ['stroke/color'],
              }),
              fg: _colorAlias('{color._cardTone.tinted.default.border.2}', {scopes: ['fill/text']}),
            },
          },
        },
      }),
    },
  }),
}
