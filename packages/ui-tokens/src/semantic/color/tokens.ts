import {_CODE_TOKEN_KEYS, AVATAR_COLORS, COLOR_VARIANTS, ELEMENT_TONES} from '../../constants'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_fromEntries} from '../../lib/_fromEntries'
import {_colorAlias} from '../../lib/color/_colorAlias'

/** @public */
export const colorTokens = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    avatar: _fromEntries(
      AVATAR_COLORS.map((color) => [
        color,
        {
          bg: _colorAlias(`{color._cardTone.avatar.${color}.bg}`, {scopes: ['fill/frame']}),
          fg: _colorAlias(`{color._cardTone.avatar.${color}.fg}`, {scopes: ['fill/text']}),
        },
      ]),
    ),
    backdrop: _colorAlias('{color._cardTone.backdrop}', {scopes: ['fill/shape']}),
    bg: _colorAlias('{color.tinted.default.bg.0}', {scopes: ['effect/color', 'fill/frame']}),
    border: _colorAlias('{color.tinted.default.border.2}', {scopes: ['stroke/color']}),
    code: {
      token: _fromEntries(
        _CODE_TOKEN_KEYS.map((key) => [
          key,
          _colorAlias(`{color._cardTone.code.token.${key}}`, {
            // scopes: ['fill/text'],
            // NOTE: hide in figma for now
            scopes: [],
          }),
        ]),
      ),
    },
    fg: _colorAlias('{color.tinted.default.fg.0}', {scopes: ['fill/text']}),
    focusRing: _colorAlias('{color._cardTone.focusRing}', {scopes: ['effect/color']}),
    link: {
      fg: _colorAlias('{color._cardTone.link.fg}', {scopes: ['fill/text']}),
    },
    muted: {
      bg: _colorAlias('{color.tinted.default.bg.1}', {scopes: ['fill/frame']}),
      border: _colorAlias('{color.tinted.default.border.1}', {scopes: ['stroke/color']}),
      fg: _colorAlias('{color.tinted.default.fg.4}', {scopes: ['fill/text']}),
    },
    shadow: {
      outline: _colorAlias('{color._cardTone.shadow.outline}', {scopes: ['effect/color']}),
      umbra: _colorAlias('{color._cardTone.shadow.umbra}', {scopes: ['effect/color']}),
      penumbra: _colorAlias('{color._cardTone.shadow.penumbra}', {scopes: ['effect/color']}),
      ambient: _colorAlias('{color._cardTone.shadow.ambient}', {scopes: ['effect/color']}),
    },
    skeleton: {
      from: _colorAlias('{color.tinted.default.bg.3}', {scopes: ['fill/frame']}),
      to: _colorAlias('{color.tinted.default.bg.2}', {scopes: ['fill/frame']}),
    },
    ..._fromEntries(
      COLOR_VARIANTS.map((v) => {
        return [
          v,
          {
            ..._fromEntries(
              ELEMENT_TONES.map((t) => [
                t,
                {
                  bg: {
                    0: _colorAlias(`{color._cardTone.${v}.${t}.bg.0}`, {scopes: ['fill/frame']}),
                    1: _colorAlias(`{color._cardTone.${v}.${t}.bg.1}`, {scopes: ['fill/frame']}),
                    2: _colorAlias(`{color._cardTone.${v}.${t}.bg.2}`, {scopes: ['fill/frame']}),
                    3: _colorAlias(`{color._cardTone.${v}.${t}.bg.3}`, {scopes: ['fill/frame']}),
                    4: _colorAlias(`{color._cardTone.${v}.${t}.bg.4}`, {scopes: ['fill/frame']}),
                  },
                  border: {
                    0: _colorAlias(`{color._cardTone.${v}.${t}.border.0}`, {
                      scopes: ['stroke/color'],
                    }),
                    1: _colorAlias(`{color._cardTone.${v}.${t}.border.1}`, {
                      scopes: ['stroke/color'],
                    }),
                    2: _colorAlias(`{color._cardTone.${v}.${t}.border.2}`, {
                      scopes: ['stroke/color'],
                    }),
                    3: _colorAlias(`{color._cardTone.${v}.${t}.border.3}`, {
                      scopes: ['stroke/color'],
                    }),
                    4: _colorAlias(`{color._cardTone.${v}.${t}.border.4}`, {
                      scopes: ['stroke/color'],
                    }),
                  },
                  fg: {
                    0: _colorAlias(`{color._cardTone.${v}.${t}.fg.0}`, {scopes: ['fill/text']}),
                    1: _colorAlias(`{color._cardTone.${v}.${t}.fg.1}`, {scopes: ['fill/text']}),
                    2: _colorAlias(`{color._cardTone.${v}.${t}.fg.2}`, {scopes: ['fill/text']}),
                    3: _colorAlias(`{color._cardTone.${v}.${t}.fg.3}`, {scopes: ['fill/text']}),
                    4: _colorAlias(`{color._cardTone.${v}.${t}.fg.4}`, {scopes: ['fill/text']}),
                  },
                },
              ]),
            ),
          },
        ]
      }),
    ),
  }),
})
