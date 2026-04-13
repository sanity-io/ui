import type {_DTCGShadowToken} from '@sanity/ui-tokens/lib'

import type {TokenTree} from './tokens'

export interface SanityFigmaShadowStyleNode {
  type: 'shadow'
  token: _DTCGShadowToken
}

export interface SanityFigmaFontStyleNode {
  type: 'font-style'
  // token: SanityTypographyToken
  tokens: TokenTree
}

export interface SanityFigmaStyle {
  name: string
  node: SanityFigmaShadowStyleNode | SanityFigmaFontStyleNode
}
