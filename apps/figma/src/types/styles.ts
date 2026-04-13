import type {DTCGShadowToken, SanityFontToken} from '@sanity/ui-tokens'

export interface SanityFigmaShadowStyleNode {
  type: 'shadow'
  token: DTCGShadowToken
}

export interface SanityFigmaFontStyleNode {
  type: 'font-style'
  token: SanityFontToken
}

export interface SanityFigmaStyle {
  name: string
  node: SanityFigmaShadowStyleNode | SanityFigmaFontStyleNode
}
