import {_CODE_TOKEN_KEYS, CARD_TONES, COLOR_VARIANTS, ELEMENT_TONES} from '../../../constants'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_colorAlias} from '../../../lib/color/_colorAlias'
import type {CardToneColorTokens, ColorToken} from '../../../lib/color/types'
import type {CardTone} from '../../../types'

/** @internal */
export const _cardToneTokens = _fromEntries(
  CARD_TONES.map((cardTone) => [
    cardTone,
    {
      _tone: {
        color: buildCardToneColorTokens(cardTone),
      },
    } as const,
  ]),
)

function buildCardToneColorTokens(cardTone: CardTone): CardToneColorTokens {
  const prefix = `_scheme.color.${cardTone}` as const

  return {
    $type: 'color',
    backdrop: _colorAlias(`{${prefix}.backdrop}`),
    focusRing: _colorAlias(`{${prefix}.focusRing}`),
    link: {
      fg: _colorAlias(`{${prefix}.link.fg}`),
    },
    shadow: {
      outline: _colorAlias(`{${prefix}.shadow.outline}`),
      umbra: _colorAlias(`{${prefix}.shadow.umbra}`),
      penumbra: _colorAlias(`{${prefix}.shadow.penumbra}`),
      ambient: _colorAlias(`{${prefix}.shadow.ambient}`),
    },
    ..._fromEntries(
      COLOR_VARIANTS.map((variant) => [
        variant,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((elementTone) => {
              const aliasPrefix = `${prefix}.${variant}.${elementTone}` as const

              const _mix = (key: 'bg' | 'border' | 'fg', step: 1 | 2 | 3) =>
                ({
                  $value: {
                    colorSpace: 'srgb',
                    components: [0, 0, 0],
                    alpha: 0,
                  },
                  $extensions: {
                    'io.sanity.expr': {
                      v: 1,
                      op: 'mix',
                      space: 'srgb',
                      stops: [
                        {color: `{${aliasPrefix}.${key}.0}`, stop: 0},
                        {color: `{${aliasPrefix}.${key}.4}`, stop: step / 4},
                      ],
                    },
                    'io.sanity.figmaAlias': `{${aliasPrefix}.${key}.${step}}`,
                  },
                }) satisfies ColorToken

              return [
                elementTone,
                {
                  bg: {
                    0: _colorAlias(`{${aliasPrefix}.bg.0}`),
                    1: _mix('bg', 1),
                    2: _mix('bg', 2),
                    3: _mix('bg', 3),
                    4: _colorAlias(`{${aliasPrefix}.bg.4}`),
                  },
                  border: {
                    0: _colorAlias(`{${aliasPrefix}.border.0}`),
                    1: _mix('border', 1),
                    2: _mix('border', 2),
                    3: _mix('border', 3),
                    4: _colorAlias(`{${aliasPrefix}.border.4}`),
                  },
                  fg: {
                    0: _colorAlias(`{${aliasPrefix}.fg.0}`),
                    1: _mix('fg', 1),
                    2: _mix('fg', 2),
                    3: _mix('fg', 3),
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
