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
  | `avatar.${AvatarColor}.${'bg' | 'fg'}`
  | 'backdrop'
  | 'border'
  | `code.token.${CodeTokenKey}`
  | 'fg'
  | 'focusRing'
  | 'link.fg'
  | 'shadow.outline'
  | 'shadow.umbra'
  | 'shadow.penumbra'
  | 'shadow.ambient'
  | `${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`

type ColorElementKey = `${ColorVariant}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`

type ColorKey =
  | `color.${ColorPaletteKey}`
  | `color.${ColorSemanticKey}`
  | `color.${ColorElementKey}`
  | `color._cardTone.${ColorSemanticKey}`
  | `color._colorScheme.${CardTone}.${ColorSemanticKey}`

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
