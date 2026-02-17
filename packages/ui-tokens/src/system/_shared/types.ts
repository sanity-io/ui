import type {SanityColorToken} from '../color/schema'
import type {TokenTree} from '../types'

export interface ColorStateTokens extends TokenTree {
  bg: SanityColorToken
  border: SanityColorToken
  fg: SanityColorToken
  muted: {
    bg: SanityColorToken
    border: SanityColorToken
    fg: SanityColorToken
  }
}
