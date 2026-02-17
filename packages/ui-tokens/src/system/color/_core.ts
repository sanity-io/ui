import {colorToken} from '../_dtcg/creators'
import type {DTCGColorValue} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import type {TokenCollection, TokenTree} from '../types'
import {mixColors} from './_colorMixing'
import {colorModel} from './_core.model'
import {PALETTE_NAMESPACE, paletteCollection} from './_palette'
import type {ColorExpr} from './_parseColorExprLiteral'
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

export const CORE_NAMESPACE = '_core'

interface CoreElementColorTokens extends TokenTree {
  bg: Record<0 | 4, SanityColorToken>
  border: Record<0 | 4, SanityColorToken>
  fg: Record<0 | 4, SanityColorToken>
}

interface CoreCardColorTokens extends TokenTree {
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
  element: Record<ColorVariant, Record<ElementTone, CoreElementColorTokens>>
}

export interface CoreTokens extends TokenTree {
  color: Record<ColorScheme, Record<CardTone, CoreCardColorTokens>>
}

export interface CoreCollectionTokens {
  [CORE_NAMESPACE]: CoreTokens
}

export type CoreCollection = TokenCollection<typeof CORE_NAMESPACE, 'default', CoreCollectionTokens>

export const _coreCollection: CoreCollection = {
  namespace: CORE_NAMESPACE,
  title: 'Core',
  modes: {
    default: {
      [CORE_NAMESPACE]: {
        color: {
          ..._fromEntries(
            COLOR_SCHEMES.map((scheme) => [
              scheme,
              {
                ..._fromEntries(
                  CARD_TONES.map((cardTone) => [
                    cardTone,
                    resolveCardColorTokens(scheme, cardTone),
                  ]),
                ),
              },
            ]),
          ),
        },
      },
    },
  },
}

function resolveCardColorTokens(scheme: ColorScheme, cardTone: CardTone): CoreCardColorTokens {
  const t = colorModel[scheme][cardTone]

  const systemBg: ColorExpr =
    scheme === 'light'
      ? {type: 'keyword', name: 'white', opacity: 1, mix: 1}
      : {type: 'keyword', name: 'black', opacity: 1, mix: 1}

  const bg = t.element.tinted.default.bg[0]

  const debugId = `card.${scheme}.${cardTone}`

  return {
    avatar: _fromEntries(
      AVATAR_COLORS.map((color) => [
        color,
        {
          bg: resolveColorExpr(t.avatar[color].bg, {
            bg,
            debugId: `${debugId}.avatar.${color}.bg`,
            systemBg,
          }),
          fg: resolveColorExpr(t.avatar[color].fg, {
            bg,
            debugId: `${debugId}.avatar.${color}.fg`,
            systemBg,
          }),
        },
      ]),
    ),
    backdrop: resolveColorExpr(t.backdrop, {
      bg,
      debugId: `${debugId}.backdrop`,
      systemBg,
    }),
    code: {
      token: _fromEntries(
        CODE_TOKEN_KEYS.map((key) => {
          return [
            key,
            resolveColorExpr(t.code.token[key], {
              bg,
              debugId: `${debugId}.code.token.${key}`,
              systemBg,
            }),
          ]
        }),
      ),
    },
    focusRing: resolveColorExpr(t.focusRing, {
      bg,
      debugId: `${debugId}.focusRing`,
      systemBg,
    }),
    link: {
      fg: resolveColorExpr(t.link.fg, {
        bg,
        debugId: `${debugId}.link.fg`,
        systemBg,
      }),
    },
    shadow: {
      outline: resolveColorExpr(t.shadow.outline, {
        bg,
        debugId: `${debugId}.shadow.outline`,
        systemBg,
      }),
      umbra: resolveColorExpr(t.shadow.umbra, {
        bg,
        debugId: `${debugId}.shadow.umbra`,
        systemBg,
      }),
      penumbra: resolveColorExpr(t.shadow.penumbra, {
        bg,
        debugId: `${debugId}.shadow.penumbra`,
        systemBg,
      }),
      ambient: resolveColorExpr(t.shadow.ambient, {
        bg,
        debugId: `${debugId}.shadow.ambient`,
        systemBg,
      }),
    },
    element: _fromEntries(
      COLOR_VARIANTS.map((variant) => [
        variant,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((elementTone) => {
              return [
                elementTone,
                resolveElementColorTokens(scheme, cardTone, variant, elementTone, {
                  bg,
                  debugId: `${debugId}.element.${variant}.${elementTone}`,
                  systemBg,
                }),
              ]
            }),
          ),
        },
      ]),
    ),
  }
}

function resolveElementColorTokens(
  scheme: ColorScheme,
  cardTone: CardTone,
  variant: ColorVariant,
  elementTone: ElementTone,
  options: {
    bg: ColorExpr
    debugId: string
    systemBg: ColorExpr
  },
): CoreElementColorTokens {
  const {bg, debugId, systemBg} = options

  const t = colorModel[scheme][cardTone].element[variant][elementTone]

  // if (scheme === 'light' && cardTone === 'suggest') {
  //   console.log({bg, debugId, systemBg})
  // }

  return {
    bg: {
      0: resolveColorExpr(t.bg[0], {
        // use systemBg for default element tone, otherwise use bg from card tone
        bg: elementTone === 'default' ? systemBg : bg,
        debugId: `${debugId}.bg.0`,
        systemBg,
      }),
      4: resolveColorExpr(t.bg[4], {bg, debugId: `${debugId}.bg.4`, systemBg}),
    },
    border: {
      0: resolveColorExpr(t.border[0], {
        bg,
        debugId: `${debugId}.border.0`,
        systemBg,
      }),
      4: resolveColorExpr(t.border[4], {
        bg,
        debugId: `${debugId}.border.4`,
        systemBg,
      }),
    },
    fg: {
      0: resolveColorExpr(t.fg[0], {bg, debugId: `${debugId}.fg.0`, systemBg}),
      4: resolveColorExpr(t.fg[4], {bg, debugId: `${debugId}.fg.4`, systemBg}),
    },
  }
}

function resolveColorExpr(
  expr: ColorExpr,
  options: {
    bg?: ColorExpr
    debugId: string
    systemBg: ColorExpr
  },
): SanityColorToken {
  const {bg, debugId, systemBg} = options

  if (expr.type === 'inherit') {
    if (!bg) {
      throw new Error(`[${debugId}] bg is required for inherit`)
    }

    return resolveColorExpr(bg, {debugId, systemBg})
  }

  const node: SanityColorToken = colorToken({
    colorSpace: 'srgb',
    components: [0, 0, 0],
    alpha: 0,
  })

  if (expr.type === 'keyword') {
    node.$value = `{${PALETTE_NAMESPACE}.${expr.name}}`
  }

  if (expr.type === 'tint') {
    node.$value = `{${PALETTE_NAMESPACE}.${expr.hue}.${expr.tint}}`
  }

  if (expr.mix !== 1) {
    const bgNode = resolveColorExpr(bg ?? systemBg, {
      debugId,
      systemBg,
    })

    // Provide mixing expression in extensions for advanced systems
    node.$extensions = {
      ...node.$extensions,
      'io.sanity': {
        ...node.$extensions?.['io.sanity'],
        expr: {
          ...node.$extensions?.['io.sanity']?.expr,
          v: 1,
          op: 'mix',
          space: 'srgb',
          stops: [
            {
              color: bgNode.$value,
              stop: 0,
            },
            {
              color: node.$value,
              stop: expr.mix,
            },
          ],
        },
      },
    }

    // Compute mixed color for fallback systems using colorjs.io
    try {
      const from = resolveColorValue(bg ?? systemBg, undefined)
      const to = resolveColorValue(expr, undefined)

      node.$value = mixColors('srgb', from, to, expr.mix)
    } catch (error) {
      // If mixing fails, keep the original value and warn
      // eslint-disable-next-line no-console
      console.warn(`[${debugId}] Failed to compute mix for ${JSON.stringify(expr)}:`, error)
    }
  }

  if (expr.opacity !== 1) {
    // Store opacity operation in extensions for advanced systems
    node.$extensions = {
      ...node.$extensions,
      'io.sanity': {
        ...node.$extensions?.['io.sanity'],
        opacity: expr.opacity,
      },
    }

    // Compute color with opacity for fallback systems
    try {
      const baseValue = resolveColorValue(expr, node)

      const withOpacity: DTCGColorValue = {
        colorSpace: baseValue.colorSpace,
        components: baseValue.components,
        alpha: (baseValue.alpha ?? 1) * expr.opacity,
        // hex: baseValue.hex,
      }

      node.$value = withOpacity
    } catch (error) {
      // If opacity application fails, keep the original value and warn
      // eslint-disable-next-line no-console
      console.warn(`[${debugId}] Failed to apply opacity for ${JSON.stringify(expr)}:`, error)
    }
  }

  return node
}

function resolveColorValue(expr: ColorExpr, node?: SanityColorToken): DTCGColorValue {
  // If mixing already occurred, read from the computed node value
  if (node?.$value && typeof node.$value !== 'string') {
    return node.$value as DTCGColorValue
  }

  if (expr.type === 'keyword') {
    return paletteCollection.modes['default'][PALETTE_NAMESPACE][expr.name].$value as DTCGColorValue
  }

  if (expr.type === 'tint') {
    return paletteCollection.modes['default'][PALETTE_NAMESPACE][expr.hue][expr.tint]
      .$value as DTCGColorValue
  }

  throw new Error(`Unsupported color expression type: ${expr.type}`)
}
