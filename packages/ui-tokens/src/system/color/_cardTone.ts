import {_fromEntries} from '../_fromEntries'
import {_sanityColorToken} from '../_sanity/creators'
import type {SanityTokenScope} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import {_colorSchemeCollection, colorSchemeToken} from './_colorScheme'
import {
  AVATAR_COLORS,
  CARD_TONES,
  CODE_TOKEN_KEYS,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from './constants'
import type {SanityColorToken} from './schema'
import type {AvatarColor, CardTone, CodeTokenKey, ColorVariant, ElementTone} from './types'

const CARD_TONE_NAMESPACE = '_cardTone'

export interface CardToneCollectionTokens {
  [CARD_TONE_NAMESPACE]: {
    color: {
      avatar: Record<
        AvatarColor,
        {
          bg: SanityColorToken
          fg: SanityColorToken
        }
      >
      backdrop: SanityColorToken
      code: {
        token: Record<CodeTokenKey, SanityColorToken>
      }
      focusRing: SanityColorToken
      link: {
        fg: SanityColorToken
      }
      shadow: {
        outline: SanityColorToken
        umbra: SanityColorToken
        penumbra: SanityColorToken
        ambient: SanityColorToken
      }
      element: Record<
        ColorVariant,
        Record<
          ElementTone,
          {
            bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
            border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
            fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
          }
        >
      >
    }
  }
}

export type CardToneCollection = TokenCollection<
  typeof CARD_TONE_NAMESPACE,
  CardTone,
  CardToneCollectionTokens
>

export const cardToneCollection: CardToneCollection = {
  namespace: CARD_TONE_NAMESPACE,
  title: 'Card tone',
  modes: _fromEntries(CARD_TONES.map((cardTone) => [cardTone, buildTokens(cardTone)])),
}

function buildTokens(cardTone: CardTone): CardToneCollectionTokens {
  return {
    [CARD_TONE_NAMESPACE]: {
      color: {
        avatar: {
          ..._fromEntries(
            AVATAR_COLORS.map((color) => [
              color,
              {
                bg: colorSchemeToken(`${cardTone}.avatar.${color}.bg`),
                fg: colorSchemeToken(`${cardTone}.avatar.${color}.fg`),
              },
            ]),
          ),
        },
        backdrop: colorSchemeToken(`${cardTone}.backdrop`),
        code: {
          token: _fromEntries(
            CODE_TOKEN_KEYS.map((key) => [key, colorSchemeToken(`${cardTone}.code.token.${key}`)]),
          ),
        },
        focusRing: colorSchemeToken(`${cardTone}.focusRing`),
        link: {
          fg: colorSchemeToken(`${cardTone}.link.fg`),
        },
        shadow: {
          outline: colorSchemeToken(`${cardTone}.shadow.outline`),
          umbra: colorSchemeToken(`${cardTone}.shadow.umbra`),
          penumbra: colorSchemeToken(`${cardTone}.shadow.penumbra`),
          ambient: colorSchemeToken(`${cardTone}.shadow.ambient`),
        },
        element: {
          ..._fromEntries(
            COLOR_VARIANTS.map((variant) => [
              variant,
              {
                ..._fromEntries(
                  ELEMENT_TONES.map((elementTone) => {
                    return [
                      elementTone,
                      {
                        bg: {
                          0: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.bg.0`),
                          1: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.bg.1`),
                          2: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.bg.2`),
                          3: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.bg.3`),
                          4: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.bg.4`),
                        },
                        border: {
                          0: colorSchemeToken(
                            `${cardTone}.element.${variant}.${elementTone}.border.0`,
                          ),
                          1: colorSchemeToken(
                            `${cardTone}.element.${variant}.${elementTone}.border.1`,
                          ),
                          2: colorSchemeToken(
                            `${cardTone}.element.${variant}.${elementTone}.border.2`,
                          ),
                          3: colorSchemeToken(
                            `${cardTone}.element.${variant}.${elementTone}.border.3`,
                          ),
                          4: colorSchemeToken(
                            `${cardTone}.element.${variant}.${elementTone}.border.4`,
                          ),
                        },
                        fg: {
                          0: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.fg.0`),
                          1: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.fg.1`),
                          2: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.fg.2`),
                          3: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.fg.3`),
                          4: colorSchemeToken(`${cardTone}.element.${variant}.${elementTone}.fg.4`),
                        },
                      },
                    ]
                  }),
                ),
              },
            ]),
          ),
        },
      },
    },
  }
}

export function cardToken(
  key:
    | `avatar.${AvatarColor}.bg`
    | `avatar.${AvatarColor}.fg`
    | 'backdrop'
    | `code.token.${CodeTokenKey}`
    | 'focusRing'
    | 'link.fg'
    | 'shadow.outline'
    | 'shadow.umbra'
    | 'shadow.penumbra'
    | 'shadow.ambient'
    | `element.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`,
  options?: {scopes?: SanityTokenScope[]},
): SanityColorToken {
  return _sanityColorToken(`{${CARD_TONE_NAMESPACE}.color.${key}}`, options)
}
