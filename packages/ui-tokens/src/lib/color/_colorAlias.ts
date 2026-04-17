import type {
  AvatarColor,
  CardTone,
  CodeTokenKey,
  ColorVariant,
  ElementTone,
  Hue,
  Tint,
} from '../../types'
import type {SanityTokenScope} from '../sanity/types'
import type {ColorToken} from './types'

type ColorPaletteKey = `palette.black` | `palette.white` | `palette.${Hue}.${Tint}`

type ColorSemanticKey =
  | 'backdrop'
  | 'border'
  | 'fg'
  | 'focusRing'
  | 'link.fg'
  | 'shadow.outline'
  | 'shadow.umbra'
  | 'shadow.penumbra'
  | 'shadow.ambient'

type ColorCodeTokenKey = `code.token.${CodeTokenKey}`

type ColorElementKey = `${ColorVariant}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`

type ColorAvatarKey = `avatar.${AvatarColor}.${'bg' | 'fg'}`

type ColorKey =
  | `color.${ColorPaletteKey}`
  | `color.${ColorSemanticKey}`
  | `color.${ColorElementKey}`
  | `color._cardTone.${ColorAvatarKey}`
  | `color._cardTone.${ColorCodeTokenKey}`
  | `color._cardTone.${ColorSemanticKey}`
  | `color._cardTone.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`
  | `color._colorScheme.${CardTone}.${ColorAvatarKey}`
  | `color._colorScheme.${CardTone}.${ColorCodeTokenKey}`
  | `color._colorScheme.${CardTone}.${ColorSemanticKey}`
  | `color._colorScheme.${CardTone}.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`

type ColorAlias = `{${ColorKey}}`

export function _colorAlias(
  alias: ColorAlias,
  options?: {scopes?: SanityTokenScope[]},
): ColorToken {
  return {
    $value: alias,
    $extensions: {
      ['io.sanity']: {
        scopes: options?.scopes,
      },
    },
  }
}
