import {
  _CODE_TOKEN_KEYS,
  AVATAR_COLORS,
  CARD_TONES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from '../../../constants'
import {colorModel} from '../../../decision/color/model'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_defineTokens} from '../../../lib/_defineTokens'
import {_fromEntries} from '../../../lib/_fromEntries'
import type {ColorExpr} from '../../../lib/color/_parseColorExprLiteral'
import type {CardToneTokens, ElementToneColorTokens} from '../../../lib/color/types'
import type {_DTCGColorValue} from '../../../lib/dtcg/types'
import type {TokenGroup} from '../../../lib/types'
import type {CardTone, ColorScheme, ColorVariant, ElementTone} from '../../../types'
import {_createColorScale} from './_createColorScale'
import {type _ResolveColorOptions, _resolveColorToken} from './_resolveColorToken'

/** @internal */
export const _colorSchemeTokens = {
  light: buildColorSchemeTokens('light'),
  dark: buildColorSchemeTokens('dark'),
} satisfies TokenGroup<ColorScheme>

function buildColorSchemeTokens(scheme: ColorScheme) {
  const model = colorModel[scheme]
  const systemBg: ColorExpr =
    scheme === 'light'
      ? {type: 'keyword', name: 'white', opacity: 1, mix: 1}
      : {type: 'keyword', name: 'black', opacity: 1, mix: 1}
  const debugId = `card.${scheme}`
  const options: _ResolveColorOptions = {bg: systemBg, systemBg}

  return _defineTokens({
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
          CARD_TONES.map((cardTone) => [cardTone, buildCardToneTokens(scheme, cardTone, options)]),
        ),
      },
    }),
  })
}

function buildCardToneTokens(
  scheme: ColorScheme,
  cardTone: CardTone,
  schemeOptions: _ResolveColorOptions,
): CardToneTokens {
  const {systemBg} = schemeOptions
  const cardModel = colorModel[scheme][cardTone]
  const debugId = `card.${scheme}.${cardTone}`
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
                  `${debugId}.element.${variant}.${elementTone}`,
                ),
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
  options: _ResolveColorOptions,
  debugId: string,
): ElementToneColorTokens {
  const {bg: cardBg, systemBg} = options
  const t = colorModel[scheme][cardTone].element[variant][elementTone]

  const bgScale = _createColorScale(
    {
      from: t.bg[0],
      to: t.bg[4],
      // use systemBg for default element tone, otherwise use bg from card tone
      bg: elementTone === 'default' ? systemBg : cardBg,
      systemBg,
    },
    debugId,
  )

  const borderScale = _createColorScale(
    {
      from: t.border[0],
      to: t.border[4],
      bg: t.bg[0],
      systemBg,
    },
    debugId,
  )

  const fgScale = _createColorScale(
    {
      from: t.fg[0],
      to: t.fg[4],
      bg: t.bg[0],
      systemBg,
    },
    debugId,
  )

  return {
    bg: {
      0: bgScale(0),
      1: bgScale(0.25),
      2: bgScale(0.5),
      3: bgScale(0.75),
      4: bgScale(1),
    },
    border: {
      0: borderScale(0),
      1: borderScale(0.25),
      2: borderScale(0.5),
      3: borderScale(0.75),
      4: borderScale(1),
    },
    fg: {
      0: fgScale(0),
      1: fgScale(0.25),
      2: fgScale(0.5),
      3: fgScale(0.75),
      4: fgScale(1),
    },
  }
}
