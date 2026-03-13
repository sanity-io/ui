import {avatarTokens} from '@sanity/ui-tokens/avatar'
import {borderTokens} from '@sanity/ui-tokens/border'
import {_buttonModeTokens, buttonTokens} from '@sanity/ui-tokens/button'
import {cardTokens} from '@sanity/ui-tokens/card'
import {_cardToneTokens, colorTokens, paletteTokens} from '@sanity/ui-tokens/color'
import {_colorSchemeTokens} from '@sanity/ui-tokens/color/_colorScheme'
import {BUTTON_MODES, CARD_TONES, COLOR_SCHEMES} from '@sanity/ui-tokens/constants'
import {containerTokens} from '@sanity/ui-tokens/container'
import {cornerTokens} from '@sanity/ui-tokens/corner'
import {focusTokens} from '@sanity/ui-tokens/focus'
import {fontTokens} from '@sanity/ui-tokens/font'
import {inputTokens} from '@sanity/ui-tokens/input'
import {radiusTokens} from '@sanity/ui-tokens/radius'
import {selectableTokens} from '@sanity/ui-tokens/selectable'
import {shadowTokens} from '@sanity/ui-tokens/shadow'
import {spaceTokens} from '@sanity/ui-tokens/space'

type TokenLayer<Name extends string = string, TokenSet = object> = {
  kind: 'layer'
  name: Name
  tokenSet: TokenSet
}

type TokenVariantLayer<
  Name extends string = string,
  Variants extends readonly string[] = readonly string[],
  TokenSets extends Record<Variants[number], object> = Record<Variants[number], object>,
> = {
  kind: 'variant'
  name: Name
  variants: Variants
  tokenSets: TokenSets
}

type LayerDefinition = TokenLayer | TokenVariantLayer

type TokenSystem = {
  layers: LayerDefinition[]
}

function layer<Name extends string, TokenSet>(
  name: Name,
  tokenSet: TokenSet,
): TokenLayer<Name, TokenSet> {
  return {
    kind: 'layer',
    name,
    tokenSet,
  }
}

function variantLayer<
  Name extends string,
  Variants extends readonly string[],
  TokenSets extends Record<Variants[number], object> = Record<Variants[number], object>,
>(
  name: Name,
  variants: Variants,
  tokenSets: TokenSets,
): TokenVariantLayer<Name, Variants, TokenSets> {
  return {
    kind: 'variant',
    name,
    variants,
    tokenSets,
  }
}

/** @public */
export const tokenSystem: TokenSystem = {
  layers: [
    // color primitives
    layer('palette', paletteTokens),
    variantLayer('_colorScheme', COLOR_SCHEMES, _colorSchemeTokens),
    variantLayer('_cardTone', CARD_TONES, _cardToneTokens),
    layer('color', colorTokens),

    // other primitives
    layer('border', borderTokens),
    layer('container', containerTokens),
    layer('corner', cornerTokens),
    layer('focus', focusTokens),
    layer('font', fontTokens),
    layer('radius', radiusTokens),
    layer('shadow', shadowTokens),
    layer('space', spaceTokens),

    // components
    layer('avatar', avatarTokens),
    variantLayer('_buttonMode', BUTTON_MODES, _buttonModeTokens),
    layer('button', buttonTokens),
    layer('card', cardTokens),
    layer('input', inputTokens),
    layer('selectable', selectableTokens),
  ],
}
