import type {SanityFontStyleToken, TokenLeaf, TokenTree} from '@sanity/ui-tokens/system'

export type SanityFontStyleCSSTokens = {
  fontFamily: string
  fontWeight: string

  // size
  fontSize: string
  lineHeight: string
  letterSpacing: string
  ascenderHeight: string
  descenderHeight: string
  iconSize: string
  customIconSize: string
}

export type CSSTokens<Tokens extends TokenTree | TokenLeaf> = {
  [key in keyof Tokens]: Tokens[key] extends SanityFontStyleToken
    ? SanityFontStyleCSSTokens
    : Tokens[key] extends TokenLeaf
      ? string
      : Tokens[key] extends TokenTree
        ? CSSTokens<Tokens[key]>
        : never
}
