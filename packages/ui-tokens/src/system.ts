import {avatarTokens} from '@sanity/ui-tokens/avatar'
import {borderTokens} from '@sanity/ui-tokens/border'
import {_buttonModeTokens, buttonTokens} from '@sanity/ui-tokens/button'
import {cardTokens} from '@sanity/ui-tokens/card'
import {_cardToneTokens, colorTokens, paletteTokens} from '@sanity/ui-tokens/color'
import {_colorSchemeTokens} from '@sanity/ui-tokens/color/scheme'
import {BUTTON_MODES, CARD_TONES, COLOR_SCHEMES, ELEMENT_TONES} from '@sanity/ui-tokens/constants'
import {containerTokens} from '@sanity/ui-tokens/container'
import {cornerTokens} from '@sanity/ui-tokens/corner'
import {elementToneTokens} from '@sanity/ui-tokens/element/tone'
import {focusTokens} from '@sanity/ui-tokens/focus'
import {fontTokens} from '@sanity/ui-tokens/font'
import {inputTokens} from '@sanity/ui-tokens/input'
import {radiusTokens} from '@sanity/ui-tokens/radius'
import {selectableTokens} from '@sanity/ui-tokens/selectable'
import {shadowTokens} from '@sanity/ui-tokens/shadow'
import {spaceTokens} from '@sanity/ui-tokens/space'

type TokenLayer<TokenSet = object> = {
  kind: 'layer'
  title: string
  name: string
  tokenSet: TokenSet
}

type TokenVariantLayer<
  Variants extends readonly string[] = readonly string[],
  TokenSets extends Record<Variants[number], object> = Record<Variants[number], object>,
> = {
  kind: 'variant'
  title: string
  name: string
  variants: Variants
  tokenSets: TokenSets
}

type LayerDefinition = TokenLayer | TokenVariantLayer

type TokenSystem = {
  layers: LayerDefinition[]
}

function layer<TokenSet>(layer: Omit<TokenLayer<TokenSet>, 'kind'>): TokenLayer<TokenSet> {
  return {kind: 'layer', ...layer}
}

function variantLayer<
  Variants extends readonly string[],
  TokenSets extends Record<Variants[number], object> = Record<Variants[number], object>,
>(
  layer: Omit<TokenVariantLayer<Variants, TokenSets>, 'kind'>,
): TokenVariantLayer<Variants, TokenSets> {
  return {kind: 'variant', ...layer}
}

/** @public */
export const tokenSystem: TokenSystem = {
  layers: [
    // color layers
    layer({
      name: 'palette',
      title: 'Palette',
      tokenSet: paletteTokens,
    }),
    variantLayer({
      name: '_colorScheme',
      title: 'Color scheme',
      variants: COLOR_SCHEMES,
      tokenSets: _colorSchemeTokens,
    }),
    variantLayer({
      name: '_cardTone',
      title: 'Card tone',
      variants: CARD_TONES,
      tokenSets: _cardToneTokens,
    }),
    layer({
      name: 'color',
      title: 'Color',
      tokenSet: colorTokens,
    }),
    variantLayer({
      name: '_elementTone',
      title: 'Element tone',
      variants: ELEMENT_TONES,
      tokenSets: elementToneTokens,
    }),

    // other layers
    layer({
      name: 'border',
      title: 'Border',
      tokenSet: borderTokens,
    }),
    layer({
      name: 'container',
      title: 'Container',
      tokenSet: containerTokens,
    }),
    layer({
      name: 'corner',
      title: 'Corner',
      tokenSet: cornerTokens,
    }),
    layer({
      name: 'focus',
      title: 'Focus',
      tokenSet: focusTokens,
    }),
    layer({
      name: 'font',
      title: 'Font',
      tokenSet: fontTokens,
    }),
    layer({
      name: 'radius',
      title: 'Radius',
      tokenSet: radiusTokens,
    }),
    layer({
      name: 'shadow',
      title: 'Shadow',
      tokenSet: shadowTokens,
    }),
    layer({
      name: 'space',
      title: 'Space',
      tokenSet: spaceTokens,
    }),

    // component layers
    layer({
      name: 'avatar',
      title: 'Avatar',
      tokenSet: avatarTokens,
    }),
    variantLayer({
      name: '_buttonMode',
      title: 'Button mode',
      variants: BUTTON_MODES,
      tokenSets: _buttonModeTokens,
    }),
    layer({
      name: 'button',
      title: 'Button',
      tokenSet: buttonTokens,
    }),
    layer({
      name: 'card',
      title: 'Card',
      tokenSet: cardTokens,
    }),
    layer({
      name: 'input',
      title: 'Input',
      tokenSet: inputTokens,
    }),
    layer({
      name: 'selectable',
      title: 'Selectable',
      tokenSet: selectableTokens,
    }),
  ],
}
