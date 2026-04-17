import {
  _CODE_TOKEN_KEYS,
  AVATAR_COLORS,
  CARD_TONES,
  COLOR_SCHEMES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from '../../constants'
import {_fromEntries} from '../../lib/_fromEntries'
import {_merge} from '../../lib/_merge'
import type {
  AvatarColor,
  CardTone,
  CodeTokenKey,
  ColorScheme,
  ColorVariant,
  ElementTone,
} from '../../types'
import {_parseColorExprLiteral, type ColorExpr} from './_parseColorExprLiteral'
import {colorSpec} from './spec'

export type SanityAvatarsColorModel = Record<
  AvatarColor,
  {
    bg: ColorExpr
    fg: ColorExpr
  }
>

export interface SanityElementColorModel {
  bg: {0: ColorExpr; 4: ColorExpr}
  border: {0: ColorExpr; 4: ColorExpr}
  fg: {0: ColorExpr; 4: ColorExpr}
}

export interface SanityCardColorModel {
  backdrop: ColorExpr
  focusRing: ColorExpr
  link: {
    fg: ColorExpr
  }
  shadow: {
    outline: ColorExpr
    umbra: ColorExpr
    penumbra: ColorExpr
    ambient: ColorExpr
  }
  element: Record<ColorVariant, Record<ElementTone, SanityElementColorModel>>
}

export type SanityColorSchemeModel = Record<CardTone, SanityCardColorModel> & {
  avatar: SanityAvatarsColorModel
  code: {
    token: Record<CodeTokenKey, ColorExpr>
  }
}

export type SanityColorModel = Record<ColorScheme, SanityColorSchemeModel>

export const colorModel: SanityColorModel = _fromEntries(
  COLOR_SCHEMES.map((scheme) => {
    const schemeIndex = scheme === 'light' ? 0 : 1
    const tokenOptions = {defaultHue: 'gray'} as const

    return [
      scheme,
      {
        avatar: _fromEntries(
          AVATAR_COLORS.map((color) => {
            const avatarSpec = _merge(colorSpec.avatar?.[color], colorSpec.avatar?.['*'])
            const avatarHue = avatarSpec._hue ?? color
            const avatarOptions = {defaultHue: avatarHue}

            return [
              color,
              {
                bg: _parseColorExprLiteral(avatarSpec.bg?.[schemeIndex] ?? '500', avatarOptions),
                fg: _parseColorExprLiteral(avatarSpec.fg?.[schemeIndex] ?? 'white', avatarOptions),
              },
            ]
          }),
        ),
        code: {
          token: _fromEntries(
            _CODE_TOKEN_KEYS.map((key) => [
              key,
              _parseColorExprLiteral(
                colorSpec.code?.token?.[key]?.[schemeIndex] ?? '600',
                tokenOptions,
              ),
            ]),
          ),
        },
        ..._fromEntries(
          CARD_TONES.map((tone) => {
            const toneSpec = _merge(colorSpec['*'], colorSpec[tone])
            const toneHue = toneSpec._hue ?? 'gray'
            const tokenOptions = {defaultHue: toneHue} as const

            return [
              tone,
              {
                backdrop: _parseColorExprLiteral(
                  toneSpec.backdrop?.[schemeIndex] ?? '500/0.5',
                  tokenOptions,
                ),

                focusRing: _parseColorExprLiteral(
                  toneSpec.focusRing?.[schemeIndex] ?? '500',
                  tokenOptions,
                ),
                link: {
                  fg: _parseColorExprLiteral(
                    toneSpec.link?.fg?.[schemeIndex] ?? 'white',
                    tokenOptions,
                  ),
                },
                shadow: {
                  outline: _parseColorExprLiteral(
                    toneSpec.shadow?.outline?.[schemeIndex] ?? 'white',
                    tokenOptions,
                  ),
                  umbra: _parseColorExprLiteral(
                    toneSpec.shadow?.umbra?.[schemeIndex] ?? 'white',
                    tokenOptions,
                  ),
                  penumbra: _parseColorExprLiteral(
                    toneSpec.shadow?.penumbra?.[schemeIndex] ?? 'white',
                    tokenOptions,
                  ),
                  ambient: _parseColorExprLiteral(
                    toneSpec.shadow?.ambient?.[schemeIndex] ?? 'white',
                    tokenOptions,
                  ),
                },

                element: _fromEntries(
                  COLOR_VARIANTS.map((variant) => {
                    return [
                      variant,
                      _fromEntries(
                        ELEMENT_TONES.map((elementTone) => {
                          const elementSpec = _merge(
                            toneSpec.element?.[variant]?.['*'],
                            toneSpec.element?.[variant]?.[elementTone],
                          )

                          const elementHue = elementSpec._hue ?? toneSpec._hue ?? 'gray'
                          const elementOptions = {defaultHue: elementHue}

                          return [
                            elementTone,
                            {
                              bg: {
                                0: _parseColorExprLiteral(
                                  elementSpec?.bg?.[0]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                                4: _parseColorExprLiteral(
                                  elementSpec?.bg?.[4]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                              },

                              border: {
                                0: _parseColorExprLiteral(
                                  elementSpec?.border?.[0]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                                4: _parseColorExprLiteral(
                                  elementSpec?.border?.[4]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                              },

                              fg: {
                                0: _parseColorExprLiteral(
                                  elementSpec?.fg?.[0]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                                4: _parseColorExprLiteral(
                                  elementSpec?.fg?.[4]?.[schemeIndex] ?? '500',
                                  elementOptions,
                                ),
                              },
                            },
                          ]
                        }),
                      ),
                    ]
                  }),
                ),
              },
            ]
          }),
        ),
      },
    ]
  }),
)
