import type {TokenTree} from '../types'
import type {
  AVATAR_COLORS,
  CARD_TONES,
  CODE_TOKEN_KEYS,
  COLOR_SCHEMES,
  // COLOR_STATES,
  COLOR_VARIANTS,
  ELEMENT_TONES,
} from './constants'
import type {SanityColorToken} from './schema'

/** @public */
export type AvatarColor = (typeof AVATAR_COLORS)[number]

/** @public */
export type CardTone = (typeof CARD_TONES)[number]

/** @internal */
export type CodeTokenKey = (typeof CODE_TOKEN_KEYS)[number]

/** @public */
export type ColorScheme = (typeof COLOR_SCHEMES)[number]

/** @public */
export type ColorVariant = (typeof COLOR_VARIANTS)[number]

/** @public */
export type ElementTone = (typeof ELEMENT_TONES)[number]

/** @internal */
export type _ColorStateTokens = {
  bg: SanityColorToken
  border: SanityColorToken
  fg: SanityColorToken
  muted: {
    bg: SanityColorToken
    border: SanityColorToken
    fg: SanityColorToken
  }
}

type _ColorTextInputStateTokens = {
  bg: SanityColorToken
  border: SanityColorToken
  fg: SanityColorToken
  muted: {
    bg: SanityColorToken
    // border: SanityColorToken
    fg: SanityColorToken
  }
}

/** @internal */
export interface ColorTextInputStatesTokens extends TokenTree {
  enabled: _ColorTextInputStateTokens
  hovered: _ColorTextInputStateTokens
  disabled: _ColorTextInputStateTokens
}

/** @internal */
export type _ColorBooleanInputStateTokens = {
  bg: SanityColorToken
  border: SanityColorToken
  fg: SanityColorToken
}

/** @internal */
export interface ColorBooleanInputStatesTokens extends TokenTree {
  unchecked: {
    enabled: _ColorBooleanInputStateTokens
    hovered: _ColorBooleanInputStateTokens
    disabled: _ColorBooleanInputStateTokens
  }

  checked: {
    enabled: _ColorBooleanInputStateTokens
    hovered: _ColorBooleanInputStateTokens
    disabled: _ColorBooleanInputStateTokens
  }
}
