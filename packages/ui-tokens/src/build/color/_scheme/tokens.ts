import {
  _CODE_TOKEN_KEYS,
  AVATAR_COLORS,
  CARD_TONES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from '../../../constants'
import {colorModel} from '../../../decision/color/model'
import {_defineToken} from '../../../lib/_defineToken'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_fromEntries} from '../../../lib/_fromEntries'
import {mixColors} from '../../../lib/color/_colorMixing'
import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {CardToneTokens, ColorToken, ElementToneColorTokens} from '../../../lib/color/types'
import type {_DTCGColorValue, _DTCGTokenAlias} from '../../../lib/dtcg/types'
import type {TokenGroup} from '../../../lib/types'
import type {CardTone, ColorScheme, ColorVariant, ElementTone} from '../../../types'
import {type _ResolveColorOptions, _resolveColorToken} from './_resolveColorToken'
import {_resolveColorValue} from './_resolveColorValue'

/** @internal */
export const _colorSchemeTokens = {
  light: buildColorSchemeTokens('light'),
  dark: buildColorSchemeTokens('dark'),
} satisfies TokenGroup<ColorScheme>

function buildColorSchemeTokens(scheme: ColorScheme) {
  const model = colorModel[scheme]
  const dark = scheme === 'dark'
  const systemBg: ColorExpr = dark
    ? {type: 'keyword', name: 'black', opacity: 1, mix: 1}
    : {type: 'keyword', name: 'white', opacity: 1, mix: 1}
  const debugId = 'color._colorScheme'
  const options: _ResolveColorOptions = {bg: systemBg, systemBg}

  return _defineTokens({
    colorScheme: _defineToken({
      $type: 'string',
      $value: scheme,
    }),
    color: _defineTokenGroup({
      $type: 'color',
      _colorScheme: {
        avatar: _fromEntries(
          AVATAR_COLORS.map((color) => [
            color,
            {
              bg: _resolveColorToken(
                model.avatar[color].bg,
                options,
                `${debugId}.avatar.${color}.bg`,
              ),
              fg: _resolveColorToken(
                model.avatar[color].fg,
                options,
                `${debugId}.avatar.${color}.fg`,
              ),
            },
          ]),
        ),
        code: {
          token: _fromEntries(
            _CODE_TOKEN_KEYS.map((key) => [
              key,
              _resolveColorToken(model.code.token[key], options, `${debugId}.code.token.${key}`),
            ]),
          ),
        },

        // tones
        ..._fromEntries(
          CARD_TONES.map((cardTone) => [
            cardTone,
            buildCardToneTokens(scheme, cardTone, options, debugId),
          ]),
        ),
      },
    }),
  })
}

function buildCardToneTokens(
  scheme: ColorScheme,
  cardTone: CardTone,
  schemeOptions: _ResolveColorOptions,
  schemeId: string,
): CardToneTokens {
  const {systemBg} = schemeOptions
  const cardModel = colorModel[scheme][cardTone]
  const debugId = `${schemeId}.${cardTone}`
  const options: _ResolveColorOptions = {
    bg: cardModel.element.tinted.default.bg[0],
    systemBg,
  }

  return {
    backdrop: _resolveColorToken(cardModel.backdrop, options, `${debugId}.backdrop`),
    focusRing: _resolveColorToken(cardModel.focusRing, options, `${debugId}.focusRing`),
    link: {
      fg: _resolveColorToken(cardModel.link.fg, options, `${debugId}.link.fg`),
    },
    shadow: {
      outline: _resolveColorToken(cardModel.shadow.outline, options, `${debugId}.shadow.outline`),
      umbra: _resolveColorToken(cardModel.shadow.umbra, options, `${debugId}.shadow.umbra`),
      penumbra: _resolveColorToken(
        cardModel.shadow.penumbra,
        options,
        `${debugId}.shadow.penumbra`,
      ),
      ambient: _resolveColorToken(cardModel.shadow.ambient, options, `${debugId}.shadow.ambient`),
    },
    ..._fromEntries(
      COLOR_VARIANTS.map((variant) => [
        variant,
        {
          ..._fromEntries(
            ELEMENT_TONES.map((elementTone) => {
              return [
                elementTone,
                resolveElementColorTokens(
                  scheme,
                  cardTone,
                  variant,
                  elementTone,
                  options,
                  `${debugId}.${variant}.${elementTone}`,
                ),
              ]
            }),
          ),
        },
      ]),
    ),
  }
}

interface ColorScaleContext {
  from: {id: string; expr: ColorExpr; token: ColorToken; bg: ColorExpr}
  to: {id: string; expr: ColorExpr; token: ColorToken; bg: ColorExpr}
}

function createColorScaleContext(options: {
  id: string
  from: ColorExpr
  to: ColorExpr
  bg: ColorExpr
  systemBg: ColorExpr
}) {
  const {id, from, to, bg, systemBg} = options

  return {
    from: {
      id: `${id}.0`,
      expr: from,
      token: _resolveColorToken(from, {bg, systemBg}, `${id}.0`),
      bg,
    },
    to: {
      id: `${id}.4`,
      expr: to,
      token: _resolveColorToken(to, {bg, systemBg}, `${id}.4`),
      bg,
    },
  }
}

function resolveElementColorTokens(
  scheme: ColorScheme,
  cardTone: CardTone,
  variant: ColorVariant,
  elementTone: ElementTone,
  options: _ResolveColorOptions,
  id: string,
): ElementToneColorTokens {
  const {bg: cardBg, systemBg} = options
  const t = colorModel[scheme][cardTone].element[variant][elementTone]

  const bg = createColorScaleContext({
    from: t.bg[0],
    to: t.bg[4],
    id: `${id}.bg`,
    bg: elementTone === 'default' ? systemBg : cardBg,
    systemBg,
  })

  const border = createColorScaleContext({
    from: t.border[0],
    to: t.border[4],
    id: `${id}.border`,
    bg: t.bg[0],
    systemBg,
  })

  const fg = createColorScaleContext({
    from: t.fg[0],
    to: t.fg[4],
    id: `${id}.fg`,
    bg: t.bg[0],
    systemBg,
  })

  const _mix = (_context: ColorScaleContext, step: number): ColorToken => {
    const ratio = step / 4

    const _from = _resolveColorValue(
      _context.from.expr.type === 'inherit' ? _context.from.bg : _context.from.expr,
      undefined,
      {
        mixBg: _context.from.bg,
        systemBg,
      },
    )

    const _to = _resolveColorValue(
      _context.to.expr.type === 'inherit' ? _context.to.bg : _context.to.expr,
      undefined,
      {
        mixBg: _context.to.bg,
        systemBg,
      },
    )

    return {
      $value: mixColors('srgb', _from, _to, ratio),
      $extensions: {
        'io.sanity.css': false, // do not include include in CSS, only used for Figma
        'io.sanity.expr': {
          v: 1,
          op: 'mix',
          space: 'srgb',
          stops: [
            {color: `{${_context.from.id}}`, stop: 0},
            {color: `{${_context.to.id}}`, stop: ratio},
          ],
        },
      },
    }
  }

  return {
    bg: {
      0: bg.from.token,
      1: _mix(bg, 1),
      2: _mix(bg, 2),
      3: _mix(bg, 3),
      4: bg.to.token,
    },
    border: {
      0: border.from.token,
      1: _mix(border, 1),
      2: _mix(border, 2),
      3: _mix(border, 3),
      4: border.to.token,
    },
    fg: {
      0: fg.from.token,
      1: _mix(fg, 1),
      2: _mix(fg, 2),
      3: _mix(fg, 3),
      4: fg.to.token,
    },
  }
}
