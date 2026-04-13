import type {SanityToken} from '@sanity/ui-tokens/lib'

export type TokenTree = {
  [key: string]: TokenTree | SanityToken
}

export interface SanityFigmaFont {
  name: string
  path: string
  value: TokenTree
}
