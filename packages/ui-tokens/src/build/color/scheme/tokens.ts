import {
  _CODE_TOKEN_KEYS,
  AVATAR_COLORS,
  CARD_TONES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from '../../../constants'
import type {ColorExpr} from '../../../decision/color/_parseColorExprLiteral'
import {colorModel} from '../../../decision/color/model'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_fromEntries} from '../../../lib/_fromEntries'
import {mixColors} from '../../../lib/color/_colorMixing'
import type {CardToneTokens, ColorToken, ElementToneColorTokens} from '../../../lib/color/types'
import type {_DTCGColorValue} from '../../../lib/dtcg/types'
import type {TokenGroup} from '../../../lib/types'
import {paletteTokens} from '../../../primitive/color/palette/tokens'
import type {CardTone, ColorScheme, ColorVariant, ElementTone} from '../../../types'

const light = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    _colorScheme: _fromEntries(
      CARD_TONES.map((cardTone) => [cardTone, buildCardToneTokens('light', cardTone)]),
    ),
  }),
})

const dark = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    _colorScheme: _fromEntries(
      CARD_TONES.map((cardTone) => [cardTone, buildCardToneTokens('dark', cardTone)]),
    ),
  }),
})

/** @internal */
export const _colorSchemeTokens = {light, dark} satisfies TokenGroup<ColorScheme>

function buildCardToneTokens(scheme: ColorScheme, cardTone: CardTone): CardToneTokens {
  const cardModel = colorModel[scheme][cardTone]
  const systemBg: ColorExpr =
    scheme === 'light'
      ? {type: 'keyword', name: 'white', opacity: 1, mix: 1}
      : {type: 'keyword', name: 'black', opacity: 1, mix: 1}
  const bg = cardModel.element.tinted.default.bg[0]
  const debugId = `card.${scheme}.${cardTone}`
  const options = {bg, systemBg} as const

  return {
    avatar: _fromEntries(
      AVATAR_COLORS.map((color) => [
        color,
        {
          bg: resolveColorExpr(
            cardModel.avatar[color].bg,
            options,
            `${debugId}.avatar.${color}.bg`,
          ),
          fg: resolveColorExpr(
            cardModel.avatar[color].fg,
            options,
            `${debugId}.avatar.${color}.fg`,
          ),
        },
      ]),
    ),
    backdrop: resolveColorExpr(cardModel.backdrop, options, `${debugId}.backdrop`),
    code: {
      token: _fromEntries(
        _CODE_TOKEN_KEYS.map((key) => [
          key,
          resolveColorExpr(cardModel.code.token[key], options, `${debugId}.code.token.${key}`),
        ]),
      ),
    },
    focusRing: resolveColorExpr(cardModel.focusRing, options, `${debugId}.focusRing`),
    link: {
      fg: resolveColorExpr(cardModel.link.fg, options, `${debugId}.link.fg`),
    },
    shadow: {
      outline: resolveColorExpr(cardModel.shadow.outline, options, `${debugId}.shadow.outline`),
      umbra: resolveColorExpr(cardModel.shadow.umbra, options, `${debugId}.shadow.umbra`),
      penumbra: resolveColorExpr(cardModel.shadow.penumbra, options, `${debugId}.shadow.penumbra`),
      ambient: resolveColorExpr(cardModel.shadow.ambient, options, `${debugId}.shadow.ambient`),
    },
    ..._fromEntries(
      COLOR_VARIANTS.map((variant) => [
        variant,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((elementTone) => [
              elementTone,
              resolveElementColorTokens(
                scheme,
                cardTone,
                variant,
                elementTone,
                options,
                `${debugId}.element.${variant}.${elementTone}`,
              ),
            ]),
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
    systemBg: ColorExpr
  },
  debugId: string,
): ElementToneColorTokens {
  const {bg: bgExpr, systemBg} = options

  const t = colorModel[scheme][cardTone].element[variant][elementTone]

  const inheritBg = elementTone === 'default' ? systemBg : bgExpr

  const bg = {
    0: resolveColorExpr(
      t.bg[0],
      {
        // use systemBg for default element tone, otherwise use bg from card tone
        bg: inheritBg,
        systemBg,
      },
      `${debugId}.bg.0`,
    ),
    4: resolveColorExpr(t.bg[4], options, `${debugId}.bg.4`),
  }

  const border = {
    0: resolveColorExpr(t.border[0], options, `${debugId}.border.0`),
    4: resolveColorExpr(t.border[4], options, `${debugId}.border.4`),
  }

  const fg = {
    0: resolveColorExpr(t.fg[0], {bg: bgExpr, systemBg}, `${debugId}.fg.0`),
    4: resolveColorExpr(t.fg[4], {bg: bgExpr, systemBg}, `${debugId}.fg.4`),
  }

  const mix = (fromExpr: ColorExpr, toExpr: ColorExpr, ratio: number): ColorToken => {
    const from = resolveColorValue(fromExpr.type === 'inherit' ? inheritBg : fromExpr)
    const to = resolveColorValue(toExpr.type === 'inherit' ? inheritBg : toExpr)

    return {
      $value: mixColors('srgb', from, to, ratio),
      $extensions: {
        'io.sanity': {
          expr: {
            v: 1,
            op: 'mix',
            space: 'srgb',
            stops: [
              {
                color: from,
                stop: 0,
              },
              {
                color: to,
                stop: ratio,
              },
            ],
          },
        },
      },
    }
  }

  return {
    bg: {
      0: bg[0],
      1: mix(t.bg[0], t.bg[4], 0.25),
      2: mix(t.bg[0], t.bg[4], 0.5),
      3: mix(t.bg[0], t.bg[4], 0.75),
      4: bg[4],
    },
    border: {
      0: border[0],
      1: mix(t.border[0], t.border[4], 0.25),
      2: mix(t.border[0], t.border[4], 0.5),
      3: mix(t.border[0], t.border[4], 0.75),
      4: border[4],
    },
    fg: {
      0: fg[0],
      1: mix(t.fg[0], t.fg[4], 0.25),
      2: mix(t.fg[0], t.fg[4], 0.5),
      3: mix(t.fg[0], t.fg[4], 0.75),
      4: fg[4],
    },
  }
}

function resolveColorExpr(
  expr: ColorExpr,
  options: {
    bg?: ColorExpr
    systemBg: ColorExpr
  },
  debugId: string,
): ColorToken {
  const {bg, systemBg} = options

  if (expr.type === 'inherit') {
    if (!bg) {
      throw new Error(`[${debugId}] bg is required for inherit`)
    }

    return resolveColorExpr(bg, {systemBg}, debugId)
  }

  const node: ColorToken = colorToken({
    colorSpace: 'srgb',
    components: [0, 0, 0],
    alpha: 0,
  })

  if (expr.type === 'keyword') {
    node.$value = `{color.palette.${expr.name}}`
  }

  if (expr.type === 'tint') {
    node.$value = `{color.palette.${expr.hue}.${expr.tint}}`
  }

  if (expr.mix !== 1) {
    const bgNode = resolveColorExpr(bg ?? systemBg, {systemBg}, debugId)

    // Provide mixing expression in extensions for advanced systems (eg. `color-mix` in CSS)
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

      const withOpacity: _DTCGColorValue = {
        colorSpace: baseValue.colorSpace,
        components: baseValue.components,
        alpha: (baseValue.alpha ?? 1) * expr.opacity,
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

function colorToken(value: _DTCGColorValue): ColorToken {
  return {$value: value}
}

function resolveColorValue(expr: ColorExpr, node?: ColorToken): _DTCGColorValue {
  // If mixing already occurred, read from the computed node value
  if (node?.$value && typeof node.$value !== 'string') {
    return node.$value as _DTCGColorValue
  }

  if (expr.type === 'keyword') {
    return paletteTokens.color.palette[expr.name].$value
  }

  if (expr.type === 'tint') {
    return paletteTokens.color.palette[expr.hue][expr.tint].$value
  }

  throw new Error(`Unsupported color expression type: ${expr.type}`)
}
