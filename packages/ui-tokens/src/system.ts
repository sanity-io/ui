import {_colorSchemeTokens} from '@sanity/ui-tokens/build/color/scheme'
import {avatarTokens} from '@sanity/ui-tokens/component/avatar'
import {buttonTokens} from '@sanity/ui-tokens/component/button'
import {_buttonModeTokens} from '@sanity/ui-tokens/component/button/mode'
import {cardTokens} from '@sanity/ui-tokens/component/card'
import {inputTokens} from '@sanity/ui-tokens/component/input'
import {selectableTokens} from '@sanity/ui-tokens/component/selectable'
import {BUTTON_MODES, CARD_TONES, COLOR_SCHEMES, ELEMENT_TONES} from '@sanity/ui-tokens/constants'
import {_cardToneTokens} from '@sanity/ui-tokens/context/card/tone'
import {elementToneTokens} from '@sanity/ui-tokens/context/element/tone'
import {borderTokens} from '@sanity/ui-tokens/decision/border'
import {containerTokens} from '@sanity/ui-tokens/decision/container'
import {cornerTokens} from '@sanity/ui-tokens/decision/corner'
import {focusTokens} from '@sanity/ui-tokens/decision/focus'
import {paletteTokens} from '@sanity/ui-tokens/primitive/color/palette'
import {fontTokens} from '@sanity/ui-tokens/primitive/font'
import {radiusTokens} from '@sanity/ui-tokens/primitive/radius'
import {shadowTokens} from '@sanity/ui-tokens/primitive/shadow'
import {spaceTokens} from '@sanity/ui-tokens/primitive/space'
import {colorTokens} from '@sanity/ui-tokens/semantic/color'

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
      name: 'elementTone',
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
