import {colorToken} from '../_dtcg/creators'
import type {DTCGColorValue} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import type {TokenCollection} from '../types'
import {mixColors} from './_colorMixing'
import {_coreCollection, CORE_NAMESPACE} from './_core'
import {paletteCollection} from './_palette'
import {
  AVATAR_COLORS,
  CARD_TONES,
  CODE_TOKEN_KEYS,
  COLOR_SCHEMES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from './constants'
import type {SanityColorToken} from './schema'
import type {
  AvatarColor,
  CardTone,
  CodeTokenKey,
  ColorScheme,
  ColorVariant,
  ElementTone,
} from './types'

/**
 * Namespace identifier for the color scheme collection.
 * @internal
 */
export const COLOR_SCHEME_NAMESPACE = '_colorScheme'

/**
 * Color scheme collection token structure.
 * @internal
 */
export interface ColorSchemeCollectionTokens {
  [COLOR_SCHEME_NAMESPACE]: {
    color: Record<
      CardTone,
      {
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
    >
  }
}

/**
 * Color scheme collection type definition.
 * @internal
 */
export type ColorSchemeCollection = TokenCollection<
  typeof COLOR_SCHEME_NAMESPACE,
  ColorScheme,
  ColorSchemeCollectionTokens
>

/**
 * The color scheme collection for global appearance (light/dark).
 *
 * @remarks
 * **Modes:** `light` | `dark`
 *
 * **Purpose:**
 * - Selects light or dark color scheme variants from the core collection
 * - Generates intermediate color steps (1, 2, 3) via color mixing
 * - First moded collection in the resolution pipeline
 *
 * **Color Mixing:**
 * This collection uses `$extensions['io.sanity'].expr` to interpolate between
 * anchor colors (0 and 4) from the core collection, creating smooth gradients.
 *
 * **Aliases:**
 * References `_core` collection with scheme-specific paths:
 * - `light` mode → `{_core.color.light.*}`
 * - `dark` mode → `{_core.color.dark.*}`
 *
 * @example
 * ```ts
 * // Light mode
 * _colorSchemeCollection.modes.light._colorScheme.color.default.element.tinted.default.bg[0]
 *
 * // Dark mode
 * _colorSchemeCollection.modes.dark._colorScheme.color.default.element.tinted.default.bg[0]
 * ```
 *
 * @internal
 */
export const _colorSchemeCollection: ColorSchemeCollection = {
  namespace: COLOR_SCHEME_NAMESPACE,
  title: 'Color scheme',
  modes: _fromEntries(COLOR_SCHEMES.map((scheme) => [scheme, buildTokens(scheme)])),
}

function buildTokens(scheme: ColorScheme): ColorSchemeCollectionTokens {
  return {
    [COLOR_SCHEME_NAMESPACE]: {
      color: {
        ..._fromEntries(
          CARD_TONES.map((cardTone) => [
            cardTone,
            {
              avatar: _fromEntries(
                AVATAR_COLORS.map((color) => [
                  color,
                  {
                    bg: buildToken(scheme, cardTone, `avatar.${color}.bg`),
                    fg: buildToken(scheme, cardTone, `avatar.${color}.fg`),
                  },
                ]),
              ),
              backdrop: buildToken(scheme, cardTone, 'backdrop'),
              code: {
                token: _fromEntries(
                  CODE_TOKEN_KEYS.map((key) => [
                    key,
                    buildToken(scheme, cardTone, `code.token.${key}`),
                  ]),
                ),
              },
              focusRing: buildToken(scheme, cardTone, 'focusRing'),
              link: {
                fg: buildToken(scheme, cardTone, 'link.fg'),
              },
              shadow: {
                outline: buildToken(scheme, cardTone, 'shadow.outline'),
                umbra: buildToken(scheme, cardTone, 'shadow.umbra'),
                penumbra: buildToken(scheme, cardTone, 'shadow.penumbra'),
                ambient: buildToken(scheme, cardTone, 'shadow.ambient'),
              },

              element: _fromEntries(
                COLOR_VARIANTS.map((variant) => [
                  variant,
                  {
                    ..._fromEntries(
                      ELEMENT_TONES.map((elementTone) => {
                        const bg = {
                          0: buildToken(scheme, cardTone, `element.${variant}.${elementTone}.bg.0`),
                          4: buildToken(scheme, cardTone, `element.${variant}.${elementTone}.bg.4`),
                        }

                        const border = {
                          0: buildToken(
                            scheme,
                            cardTone,
                            `element.${variant}.${elementTone}.border.0`,
                          ),
                          4: buildToken(
                            scheme,
                            cardTone,
                            `element.${variant}.${elementTone}.border.4`,
                          ),
                        }

                        const fg = {
                          0: buildToken(scheme, cardTone, `element.${variant}.${elementTone}.fg.0`),
                          4: buildToken(scheme, cardTone, `element.${variant}.${elementTone}.fg.4`),
                        }

                        const mix = (
                          fromKey: `${'bg' | 'border' | 'fg'}.${0 | 4}`,
                          toKey: `${'bg' | 'border' | 'fg'}.${0 | 4}`,
                          ratio: number,
                        ): SanityColorToken => {
                          const from = _getPaletteValue(_getCoreValue(fromKey).$value)
                          const to = _getPaletteValue(_getCoreValue(toKey).$value)

                          function _getCoreValue(key: `${'bg' | 'border' | 'fg'}.${0 | 4}`) {
                            const el =
                              _coreCollection.modes.default[CORE_NAMESPACE].color[scheme][cardTone]
                                .element
                            if (key === 'bg.0') return el[variant][elementTone].bg[0]
                            if (key === 'bg.4') return el[variant][elementTone].bg[4]
                            if (key === 'border.0') return el[variant][elementTone].border[0]
                            if (key === 'border.4') return el[variant][elementTone].border[4]
                            if (key === 'fg.0') return el[variant][elementTone].fg[0]
                            if (key === 'fg.4') return el[variant][elementTone].fg[4]
                            throw new Error(`Invalid from key: ${key}`)
                          }

                          function getLocal(key: `${'bg' | 'border' | 'fg'}.${0 | 4}`) {
                            if (key === 'bg.0') return bg[0]
                            if (key === 'bg.4') return bg[4]
                            if (key === 'border.0') return border[0]
                            if (key === 'border.4') return border[4]
                            if (key === 'fg.0') return fg[0]
                            if (key === 'fg.4') return fg[4]
                            throw new Error(`Invalid from key: ${key}`)
                          }

                          return {
                            $type: 'color',
                            $value: mixColors('srgb', from, to, ratio),
                            $extensions: {
                              'io.sanity': {
                                expr: {
                                  v: 1,
                                  op: 'mix',
                                  space: 'srgb',
                                  stops: [
                                    {
                                      color: getLocal(fromKey).$value,
                                      stop: 0,
                                    },
                                    {
                                      color: getLocal(toKey).$value,
                                      stop: ratio,
                                    },
                                  ],
                                },
                              },
                            },
                          }
                        }

                        return [
                          elementTone,
                          {
                            bg: {
                              0: bg[0],
                              1: mix('bg.0', 'bg.4', 0.25),
                              2: mix('bg.0', 'bg.4', 0.5),
                              3: mix('bg.0', 'bg.4', 0.75),
                              4: bg[4],
                            },

                            border: {
                              0: border[0],
                              1: mix('border.0', 'border.4', 0.25),
                              2: mix('border.0', 'border.4', 0.5),
                              3: mix('border.0', 'border.4', 0.75),
                              4: border[4],
                            },

                            fg: {
                              0: fg[0],
                              1: mix('fg.0', 'fg.4', 0.25),
                              2: mix('fg.0', 'fg.4', 0.5),
                              3: mix('fg.0', 'fg.4', 0.75),
                              4: fg[4],
                            },
                          },
                        ]
                      }),
                    ),
                  },
                ]),
              ),
            },
          ]),
        ),
      },
    },
  }
}

function buildToken(
  scheme: ColorScheme,
  cardTone: CardTone,
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
    | `element.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 4}`,
): SanityColorToken {
  return colorToken(`{${CORE_NAMESPACE}.color.${scheme}.${cardTone}.${key}}`)
}

export function colorSchemeToken(
  key:
    | `${CardTone}.avatar.${AvatarColor}.bg`
    | `${CardTone}.avatar.${AvatarColor}.fg`
    | `${CardTone}.backdrop`
    | `${CardTone}.code.token.${CodeTokenKey}`
    | `${CardTone}.focusRing`
    | `${CardTone}.link.fg`
    | `${CardTone}.shadow.outline`
    | `${CardTone}.shadow.umbra`
    | `${CardTone}.shadow.penumbra`
    | `${CardTone}.shadow.ambient`
    | `${CardTone}.element.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`,
): SanityColorToken {
  return colorToken(`{${COLOR_SCHEME_NAMESPACE}.color.${key}}`)
}

function _getPaletteValue(input: DTCGColorValue | string): DTCGColorValue {
  if (typeof input === 'string') {
    const path = input.slice(1, -1).split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let v: any = paletteCollection.modes.default
    for (const p of path) {
      v = v[p]
    }
    if (!v) {
      throw new Error(`Invalid palette value: ${JSON.stringify(input)}`)
    }
    return v.$value as DTCGColorValue
  }

  return input
}
