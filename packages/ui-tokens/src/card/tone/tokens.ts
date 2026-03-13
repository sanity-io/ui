import {_colorAlias} from '../../color/lib/_colorAlias'
import type {CardToneTokens} from '../../color/lib/types'
import {
  _CODE_TOKEN_KEYS,
  AVATAR_COLORS,
  CARD_TONES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from '../../constants'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_fromEntries} from '../../lib/_fromEntries'
import type {CardTone} from '../../types'

/** @internal */
export const _cardToneTokens = _fromEntries(
  CARD_TONES.map((cardTone) => [
    cardTone,
    {
      color: _defineTokenGroup({
        $type: 'color',
        _cardTone: buildCardToneTokens(cardTone),
      }),
    } as const,
  ]),
)

function buildCardToneTokens(cardTone: CardTone): CardToneTokens {
  return {
    avatar: {
      ..._fromEntries(
        AVATAR_COLORS.map((color) => [
          color,
          {
            bg: _colorAlias(`{color._colorScheme.${cardTone}.avatar.${color}.bg}`),
            fg: _colorAlias(`{color._colorScheme.${cardTone}.avatar.${color}.fg}`),
          },
        ]),
      ),
    },
    backdrop: _colorAlias(`{color._colorScheme.${cardTone}.backdrop}`),
    code: {
      token: _fromEntries(
        _CODE_TOKEN_KEYS.map((key) => [
          key,
          _colorAlias(`{color._colorScheme.${cardTone}.code.token.${key}}`),
        ]),
      ),
    },
    focusRing: _colorAlias(`{color._colorScheme.${cardTone}.focusRing}`),
    link: {
      fg: _colorAlias(`{color._colorScheme.${cardTone}.link.fg}`),
    },
    shadow: {
      outline: _colorAlias(`{color._colorScheme.${cardTone}.shadow.outline}`),
      umbra: _colorAlias(`{color._colorScheme.${cardTone}.shadow.umbra}`),
      penumbra: _colorAlias(`{color._colorScheme.${cardTone}.shadow.penumbra}`),
      ambient: _colorAlias(`{color._colorScheme.${cardTone}.shadow.ambient}`),
    },
    ..._fromEntries(
      COLOR_VARIANTS.map((variant) => [
        variant,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((elementTone) => {
              const aliasPrefix =
                `color._colorScheme.${cardTone}.${variant}.${elementTone}` as const

              return [
                elementTone,
                {
                  bg: {
                    0: _colorAlias(`{${aliasPrefix}.bg.0}`),
                    1: _colorAlias(`{${aliasPrefix}.bg.1}`),
                    2: _colorAlias(`{${aliasPrefix}.bg.2}`),
                    3: _colorAlias(`{${aliasPrefix}.bg.3}`),
                    4: _colorAlias(`{${aliasPrefix}.bg.4}`),
                  },
                  border: {
                    0: _colorAlias(`{${aliasPrefix}.border.0}`),
                    1: _colorAlias(`{${aliasPrefix}.border.1}`),
                    2: _colorAlias(`{${aliasPrefix}.border.2}`),
                    3: _colorAlias(`{${aliasPrefix}.border.3}`),
                    4: _colorAlias(`{${aliasPrefix}.border.4}`),
                  },
                  fg: {
                    0: _colorAlias(`{${aliasPrefix}.fg.0}`),
                    1: _colorAlias(`{${aliasPrefix}.fg.1}`),
                    2: _colorAlias(`{${aliasPrefix}.fg.2}`),
                    3: _colorAlias(`{${aliasPrefix}.fg.3}`),
                    4: _colorAlias(`{${aliasPrefix}.fg.4}`),
                  },
                },
              ]
            }),
          ),
        },
      ]),
    ),
  }
}
