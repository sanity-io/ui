// import type {SanityTypopgrahyToken} from '@sanity/ui-tokens'

import type {SanityTypopgrahyToken} from '@sanity/ui-tokens/lib'

import type {Unpack} from '../util/types'

export type SanityFontStyleCSSTokens = {
  fontFamily: string
  fontWeight: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
  ascenderHeight: string
  descenderHeight: string
  iconSize: string
  customIconSize: string
}

type HasValue = {
  $value: unknown
}

// type HasType = {
//   $type?: unknown
// }

type IsTypographyToken<T> = T extends {
  $value: unknown
  $type: 'typography'
}
  ? true
  : T extends SanityTypopgrahyToken
    ? true
    : false

// Helper to detect if an object is a token group with $type
type HasTypeProperty<T> = T extends {$type: unknown} ? true : false

// Helper to get the $type value from an object
type GetTypeProperty<T> = T extends {$type: infer Type} ? Type : never

// Process tokens with inherited type context
type CSSTokensWithType<Tokens, InheritedType = never> = Tokens extends HasValue
  ? // This is a token leaf node (has $value)
    // Check if this token explicitly declares typography type
    IsTypographyToken<Tokens> extends true
    ? SanityFontStyleCSSTokens // Token explicitly declares typography type
    : // Token doesn't explicitly declare typography
      // If token has its own $type property, use that (ignore inherited)
      // Otherwise, use inherited type
      HasTypeProperty<Tokens> extends true
      ? string // Token has its own $type (not typography), so it's a regular string
      : // Token has no $type, check inherited
        [InheritedType] extends ['typography']
        ? SanityFontStyleCSSTokens // Token inherits typography type
        : string // Regular token
  : Tokens extends object
    ? // This is an object - check if it has $type to pass to children
      HasTypeProperty<Tokens> extends true
      ? // This object has $type - extract it and pass to children
        Unpack<{
          [K in keyof Tokens as K extends `$${string}` ? never : K]: CSSTokensWithType<
            Tokens[K],
            GetTypeProperty<Tokens>
          >
        }>
      : // No $type on this object - continue with inherited type
        Unpack<{
          [K in keyof Tokens as K extends `$${string}` ? never : K]: CSSTokensWithType<
            Tokens[K],
            InheritedType
          >
        }>
    : never

export type CSSTokens<Tokens> = CSSTokensWithType<Tokens, never>

// CSSVars recursively converts CSS tokens to their var() equivalents
// Special handling: if an object has all the typography properties (from SanityFontStyleCSSTokens),
// preserve its structure and convert each property to a CSS var
export type CSSVars<T> = T extends string
  ? `var(--${string})`
  : T extends object
    ? // Check if this looks like a typography token object (has fontFamily, fontSize, etc.)
      'fontFamily' extends keyof T
      ? 'fontSize' extends keyof T
        ? 'lineHeight' extends keyof T
          ? // This is a typography token object - preserve structure
            {[K in keyof T]: `var(--${string})`}
          : // Regular object - recurse
            {[K in keyof T]: CSSVars<T[K]>}
        : {[K in keyof T]: CSSVars<T[K]>}
      : // Regular object - recurse
        {[K in keyof T]: CSSVars<T[K]>}
    : `var(--${string})`
