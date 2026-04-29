import type {
  _ButtonState,
  _CodeTokenKey,
  AvatarColor,
  CardTone,
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

type ColorCodeTokenKey = `code.token.${_CodeTokenKey}`

type ColorElementKey = `${ColorVariant}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`

type ColorAvatarKey = `avatar.${AvatarColor}.${'bg' | 'fg'}`

type BooleanState = 'unchecked' | 'checked'

type InputState = 'enabled' | 'hovered' | 'disabled'

type SelectableState = 'enabled' | 'hovered' | 'pressed' | 'selected' | 'disabled'

type ColorKey =
  | `_scheme.color.${ColorAvatarKey}`
  | `_scheme.color.${ColorCodeTokenKey}`
  | `_scheme.color.${CardTone}.${ColorSemanticKey}`
  | `_scheme.color.${CardTone}.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`
  | `_tone.color.${ColorSemanticKey}`
  | `_tone.color.${ColorVariant}.${ElementTone}.${'bg' | 'border' | 'fg'}.${0 | 1 | 2 | 3 | 4}`
  | `color.${ColorPaletteKey | ColorSemanticKey | ColorElementKey}`
  | `boolean.color.${'valid' | 'invalid'}.${BooleanState}.${InputState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `boolean.color.${BooleanState}.${InputState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `button.color.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `button.color.${_ButtonState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `input.color.${'valid' | 'invalid'}.${InputState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `input.color.${InputState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`
  | `selectable.color.${SelectableState}.${'bg' | 'border' | 'fg' | 'muted.bg' | 'muted.border' | 'muted.fg'}`

type ColorAlias = `{${ColorKey}}`

export function _colorAlias(
  alias: ColorAlias,
  options?: {scopes?: SanityTokenScope[]},
): ColorToken {
  return {
    $value: alias,
    $extensions: {
      ['io.sanity.scopes']: options?.scopes,
    },
  }
}
