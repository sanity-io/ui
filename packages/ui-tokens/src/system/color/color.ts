import {_fromEntries} from '../_fromEntries'
import {_sanityColorToken} from '../_sanity/creators'
import type {SanityTokenScope} from '../_sanity/schema'
import type {TokenCollection, TokenTree} from '../types'
import {cardToken} from './_cardTone'
import {AVATAR_COLORS, CODE_TOKEN_KEYS, COLOR_VARIANTS, ELEMENT_TONES} from './constants'
import type {SanityColorToken} from './schema'
import type {
  _ColorStateTokens,
  AvatarColor,
  CodeTokenKey,
  ColorBooleanInputStatesTokens,
  ColorTextInputStatesTokens,
  ColorVariant,
  ElementTone,
} from './types'

/**
 * Namespace identifier for the color collection.
 */
const COLOR_NAMESPACE = 'color'

/**
 * Color collection token structure.
 */
export interface ColorCollectionTokens extends TokenTree {
  color: {
    avatar: Record<
      AvatarColor,
      {
        bg: SanityColorToken
        fg: SanityColorToken
      }
    >
    backdrop: SanityColorToken
    bg: SanityColorToken
    border: SanityColorToken
    fg: SanityColorToken
    code: {
      token: Record<CodeTokenKey, SanityColorToken>
    }
    focusRing: SanityColorToken
    link: {
      fg: SanityColorToken
    }
    muted: {
      bg: SanityColorToken
      border: SanityColorToken
      fg: SanityColorToken
    }
    skeleton: {
      from: SanityColorToken
      to: SanityColorToken
    }
    shadow: {
      outline: SanityColorToken
      umbra: SanityColorToken
      penumbra: SanityColorToken
      ambient: SanityColorToken
    }

    tinted: {
      bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
    } & Record<
      ElementTone,
      {
        bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
        border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
        fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      }
    >
    solid: {
      bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
    } & Record<
      ElementTone,
      {
        bg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
        border: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
        fg: Record<0 | 1 | 2 | 3 | 4, SanityColorToken>
      }
    >

    card: {
      // enabled: _ColorStateTokens
      hovered: _ColorStateTokens
      pressed: _ColorStateTokens
      selected: _ColorStateTokens
      disabled: _ColorStateTokens
    }

    input: {
      valid: ColorTextInputStatesTokens
      invalid: ColorTextInputStatesTokens

      boolean: {
        valid: ColorBooleanInputStatesTokens
        invalid: ColorBooleanInputStatesTokens
      }
    }
  }
}

/**
 * Color collection type definition.
 */
export type ColorCollection = TokenCollection<
  typeof COLOR_NAMESPACE,
  'default',
  ColorCollectionTokens
>

/**
 * The primary public color collection.
 *
 * @remarks
 * This is the **main public API** for color tokens in the Sanity UI system.
 * Applications should consume these tokens, not internal collections.
 *
 * **Characteristics:**
 * - Public collection (no `_` prefix)
 * - Unmoded (single "default" mode)
 * - Stable API contract
 * - References internal collections (`_elementTone`, `_avatarColor`)
 *
 * **Token Categories:**
 * - `bg`, `fg`, `border` - Basic foreground/background colors
 * - `muted.*` - Muted/subdued variants
 * - `tinted.*` - Tinted variants with 5 steps (0-4)
 * - `solid.*` - Solid variants with 5 steps (0-4)
 * - `avatar.*` - Avatar-specific colors
 * - `code.*` - Syntax highlighting colors
 * - `shadow.*` - Shadow layer colors
 * - `focusRing`, `link`, `backdrop`, `skeleton` - Specialized colors
 *
 * **Contextual Resolution:**
 * Token values change based on active modes:
 * - Color scheme (light/dark)
 * - Card tone (surface context)
 * - Element tone (element intent)
 * - Avatar color (avatar variant)
 *
 * @example
 * ```ts
 * // Basic colors
 * colorCollection.modes.default.color.bg
 * colorCollection.modes.default.color.fg
 *
 * // Tinted variants
 * colorCollection.modes.default.color.tinted.bg[0]  // lightest
 * colorCollection.modes.default.color.tinted.bg[4]  // darkest
 *
 * // Specialized
 * colorCollection.modes.default.color.avatar.bg
 * colorCollection.modes.default.color.code.token.string
 * ```
 */
export const colorCollection: ColorCollection = {
  namespace: 'color',
  title: 'Color',
  modes: {
    default: {
      [COLOR_NAMESPACE]: {
        avatar: _fromEntries(
          AVATAR_COLORS.map((color) => [
            color,
            {
              bg: cardToken(`avatar.${color}.bg`, {scopes: ['fill/frame']}),
              fg: cardToken(`avatar.${color}.fg`, {scopes: ['fill/text']}),
            },
          ]),
        ),
        backdrop: cardToken('backdrop', {scopes: ['fill/shape']}),
        bg: _colorAlias('tinted.default.bg.0', {scopes: ['effect/color', 'fill/frame']}),
        border: _colorAlias('tinted.default.border.2', {scopes: ['stroke/color']}),
        code: {
          token: _fromEntries(
            CODE_TOKEN_KEYS.map((key) => [
              key,
              cardToken(`code.token.${key}`, {
                // scopes: ['fill/text'],
                // NOTE: hide in figma for now
                scopes: [],
              }),
            ]),
          ),
        },
        fg: _colorAlias('tinted.default.fg.0', {scopes: ['fill/text']}),
        focusRing: cardToken('focusRing', {scopes: ['effect/color']}),
        link: {
          fg: cardToken('link.fg', {scopes: ['fill/text']}),
        },
        muted: {
          bg: _colorAlias('tinted.default.bg.1', {scopes: ['fill/frame']}),
          border: _colorAlias('tinted.default.border.1', {scopes: ['stroke/color']}),
          fg: _colorAlias('tinted.default.fg.4', {scopes: ['fill/text']}),
        },
        shadow: {
          outline: cardToken('shadow.outline', {scopes: ['effect/color']}),
          umbra: cardToken('shadow.umbra', {scopes: ['effect/color']}),
          penumbra: cardToken('shadow.penumbra', {scopes: ['effect/color']}),
          ambient: cardToken('shadow.ambient', {scopes: ['effect/color']}),
        },
        skeleton: {
          from: cardToken('element.tinted.default.bg.3', {scopes: ['fill/frame']}),
          to: cardToken('element.tinted.default.bg.2', {scopes: ['fill/frame']}),
        },

        ..._fromEntries(
          COLOR_VARIANTS.map((v) => {
            return [
              v,
              {
                bg: {
                  0: _colorAlias(`${v}.default.bg.0`, {scopes: ['fill/frame']}),
                  1: _colorAlias(`${v}.default.bg.1`, {scopes: ['fill/frame']}),
                  2: _colorAlias(`${v}.default.bg.2`, {scopes: ['fill/frame']}),
                  3: _colorAlias(`${v}.default.bg.3`, {scopes: ['fill/frame']}),
                  4: _colorAlias(`${v}.default.bg.4`, {scopes: ['fill/frame']}),
                },
                border: {
                  0: _colorAlias(`${v}.default.border.0`, {scopes: ['stroke/color']}),
                  1: _colorAlias(`${v}.default.border.1`, {scopes: ['stroke/color']}),
                  2: _colorAlias(`${v}.default.border.2`, {scopes: ['stroke/color']}),
                  3: _colorAlias(`${v}.default.border.3`, {scopes: ['stroke/color']}),
                  4: _colorAlias(`${v}.default.border.4`, {scopes: ['stroke/color']}),
                },
                fg: {
                  0: _colorAlias(`${v}.default.fg.0`, {scopes: ['fill/text']}),
                  1: _colorAlias(`${v}.default.fg.1`, {scopes: ['fill/text']}),
                  2: _colorAlias(`${v}.default.fg.2`, {scopes: ['fill/text']}),
                  3: _colorAlias(`${v}.default.fg.3`, {scopes: ['fill/text']}),
                  4: _colorAlias(`${v}.default.fg.4`, {scopes: ['fill/text']}),
                },

                ..._fromEntries(
                  ELEMENT_TONES.map((t) => [
                    t,
                    {
                      bg: {
                        0: cardToken(`element.${v}.${t}.bg.0`, {scopes: ['fill/frame']}),
                        1: cardToken(`element.${v}.${t}.bg.1`, {scopes: ['fill/frame']}),
                        2: cardToken(`element.${v}.${t}.bg.2`, {scopes: ['fill/frame']}),
                        3: cardToken(`element.${v}.${t}.bg.3`, {scopes: ['fill/frame']}),
                        4: cardToken(`element.${v}.${t}.bg.4`, {scopes: ['fill/frame']}),
                      },
                      border: {
                        0: cardToken(`element.${v}.${t}.border.0`, {scopes: ['stroke/color']}),
                        1: cardToken(`element.${v}.${t}.border.1`, {scopes: ['stroke/color']}),
                        2: cardToken(`element.${v}.${t}.border.2`, {scopes: ['stroke/color']}),
                        3: cardToken(`element.${v}.${t}.border.3`, {scopes: ['stroke/color']}),
                        4: cardToken(`element.${v}.${t}.border.4`, {scopes: ['stroke/color']}),
                      },
                      fg: {
                        0: cardToken(`element.${v}.${t}.fg.0`, {scopes: ['fill/text']}),
                        1: cardToken(`element.${v}.${t}.fg.1`, {scopes: ['fill/text']}),
                        2: cardToken(`element.${v}.${t}.fg.2`, {scopes: ['fill/text']}),
                        3: cardToken(`element.${v}.${t}.fg.3`, {scopes: ['fill/text']}),
                        4: cardToken(`element.${v}.${t}.fg.4`, {scopes: ['fill/text']}),
                      },
                    },
                  ]),
                ),
              },
            ]
          }),
        ),

        input: {
          valid: {
            enabled: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.1'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            hovered: {
              bg: _colorAlias('tinted.bg.0'),
              border: _colorAlias('tinted.border.4'),
              fg: _colorAlias('tinted.fg.0'),
              muted: {
                bg: _colorAlias('tinted.bg.1'),
                fg: _colorAlias('tinted.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.bg.1'),
              border: _colorAlias('tinted.border.0'),
              fg: _colorAlias('tinted.border.3'),
              muted: {
                bg: _colorAlias('tinted.bg.2'),
                fg: _colorAlias('tinted.border.2'),
              },
            },
          },

          invalid: {
            enabled: {
              bg: _colorAlias('tinted.critical.bg.1'),
              border: _colorAlias('tinted.critical.border.1'),
              fg: _colorAlias('tinted.critical.fg.4'),
              muted: {
                bg: _colorAlias('tinted.critical.bg.2'),
                fg: _colorAlias('tinted.critical.fg.4'),
              },
            },

            hovered: {
              bg: _colorAlias('tinted.critical.bg.1'),
              border: _colorAlias('tinted.critical.border.4'),
              fg: _colorAlias('tinted.critical.fg.0'),
              muted: {
                bg: _colorAlias('tinted.critical.bg.2'),
                fg: _colorAlias('tinted.critical.fg.4'),
              },
            },

            disabled: {
              bg: _colorAlias('tinted.critical.bg.1'),
              border: _colorAlias('tinted.critical.border.0'),
              fg: _colorAlias('tinted.critical.border.3'),
              muted: {
                bg: _colorAlias('tinted.critical.bg.2'),
                fg: _colorAlias('tinted.critical.border.2'),
              },
            },
          },

          boolean: {
            valid: {
              unchecked: {
                enabled: {
                  bg: _colorAlias('tinted.bg.0'),
                  border: _colorAlias('tinted.border.2'),
                  fg: _colorAlias('tinted.fg.0'),
                },

                hovered: {
                  bg: _colorAlias('tinted.bg.0'),
                  border: _colorAlias('tinted.border.4'),
                  fg: _colorAlias('tinted.fg.0'),
                },

                disabled: {
                  bg: _colorAlias('tinted.bg.1'),
                  border: _colorAlias('tinted.border.0'),
                  fg: _colorAlias('tinted.border.4'),
                },
              },

              checked: {
                enabled: {
                  bg: _colorAlias('tinted.fg.0'),
                  border: _colorAlias('tinted.fg.0'),
                  fg: _colorAlias('tinted.bg.0'),
                },
                hovered: {
                  bg: _colorAlias('tinted.fg.1'),
                  border: _colorAlias('tinted.fg.1'),
                  fg: _colorAlias('tinted.bg.0'),
                },
                disabled: {
                  bg: _colorAlias('tinted.border.3'),
                  border: _colorAlias('tinted.border.3'),
                  fg: _colorAlias('tinted.bg.1'),
                },
              },
            },

            invalid: {
              unchecked: {
                enabled: {
                  bg: _colorAlias('tinted.critical.bg.1'),
                  border: _colorAlias('tinted.critical.border.2'),
                  fg: _colorAlias('tinted.critical.fg.2'),
                },

                hovered: {
                  bg: _colorAlias('tinted.critical.bg.1'),
                  border: _colorAlias('tinted.critical.border.4'),
                  fg: _colorAlias('tinted.critical.fg.2'),
                },

                disabled: {
                  bg: _colorAlias('tinted.critical.bg.1'),
                  border: _colorAlias('tinted.critical.border.0'),
                  fg: _colorAlias('tinted.critical.border.3'),
                },
              },

              checked: {
                enabled: {
                  bg: _colorAlias('tinted.critical.fg.2'),
                  border: _colorAlias('tinted.critical.fg.2'),
                  fg: _colorAlias('tinted.critical.bg.1'),
                },
                hovered: {
                  bg: _colorAlias('tinted.critical.fg.1'),
                  border: _colorAlias('tinted.critical.fg.1'),
                  fg: _colorAlias('tinted.critical.bg.1'),
                },
                disabled: {
                  bg: _colorAlias('tinted.critical.border.3'),
                  border: _colorAlias('tinted.critical.border.3'),
                  fg: _colorAlias('tinted.critical.bg.1'),
                },
              },
            },
          },
        },

        card: {
          hovered: {
            bg: _colorAlias('tinted.bg.1'),
            border: _colorAlias('tinted.border.3'),
            fg: _colorAlias('tinted.fg.0'),
            muted: {
              bg: _colorAlias('tinted.bg.2'),
              border: _colorAlias('tinted.border.2'),
              fg: _colorAlias('tinted.fg.4'),
            },
          },
          pressed: {
            bg: _colorAlias('tinted.bg.2'),
            border: _colorAlias('tinted.border.4'),
            fg: _colorAlias('tinted.fg.0'),
            muted: {
              bg: _colorAlias('tinted.bg.3'),
              border: _colorAlias('tinted.border.3'),
              fg: _colorAlias('tinted.fg.4'),
            },
          },
          selected: {
            bg: _colorAlias('solid.primary.bg.0'),
            border: _colorAlias('solid.primary.border.2'),
            fg: _colorAlias('solid.primary.fg.0'),
            muted: {
              bg: _colorAlias('solid.primary.bg.1'),
              border: _colorAlias('solid.primary.border.1'),
              fg: _colorAlias('solid.primary.fg.4'),
            },
          },
          disabled: {
            bg: _colorAlias('tinted.bg.0'),
            border: _colorAlias('tinted.border.0'),
            fg: _colorAlias('tinted.border.3'),
            muted: {
              bg: _colorAlias('tinted.bg.1'),
              border: _colorAlias('tinted.bg.0'),
              fg: _colorAlias('tinted.border.2'),
            },
          },
        },
      },
    },
  },
}

export function _colorAlias(
  key:
    | `${ColorVariant}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`
    | `${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`,
  options?: {scopes?: SanityTokenScope[]},
) {
  return _sanityColorToken(`{${COLOR_NAMESPACE}.${key}}`, options)
}
