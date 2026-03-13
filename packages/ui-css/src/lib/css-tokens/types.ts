// // import type {SanityTypographyToken} from '@sanity/ui-tokens'

// import type {SanityTypographyToken} from '@sanity/ui-tokens/lib'

// import type {Unpack} from '../util/types'

// export type SanityFontStyleCSSTokens = {
//   fontFamily: string
//   fontWeight: string
//   fontSize: string
//   lineHeight: string
//   letterSpacing: string
//   ascenderHeight: string
//   descenderHeight: string
//   iconSize: string
//   customIconSize: string
// }

// type HasValue = {
//   $value: unknown
// }

// // type HasType = {
// //   $type?: unknown
// // }

// type IsTypographyToken<T> = T extends {
//   $value: unknown
//   $type: 'typography'
// }
//   ? true
//   : T extends SanityTypographyToken
//     ? true
//     : false

// // Helper to detect if an object is a token group with $type
// type HasTypeProperty<T> = T extends {$type: unknown} ? true : false

// // Helper to get the $type value from an object
// type GetTypeProperty<T> = T extends {$type: infer Type} ? Type : never

// // Process tokens with inherited type context
// type CSSTokensWithType<Tokens, InheritedType = never> = Tokens extends HasValue
//   ? // This is a token leaf node (has $value)
//     // Check if this token explicitly declares typography type
//     IsTypographyToken<Tokens> extends true
//     ? SanityFontStyleCSSTokens // Token explicitly declares typography type
//     : // Token doesn't explicitly declare typography
//       // If token has its own $type property, use that (ignore inherited)
//       // Otherwise, use inherited type
//       HasTypeProperty<Tokens> extends true
//       ? string // Token has its own $type (not typography), so it's a regular string
//       : // Token has no $type, check inherited
//         [InheritedType] extends ['typography']
//         ? SanityFontStyleCSSTokens // Token inherits typography type
//         : string // Regular token
//   : Tokens extends object
//     ? // This is an object - check if it has $type to pass to children
//       HasTypeProperty<Tokens> extends true
//       ? // This object has $type - extract it and pass to children
//         Unpack<{
//           [K in keyof Tokens as K extends `$${string}` ? never : K]: CSSTokensWithType<
//             Tokens[K],
//             GetTypeProperty<Tokens>
//           >
//         }>
//       : // No $type on this object - continue with inherited type
//         Unpack<{
//           [K in keyof Tokens as K extends `$${string}` ? never : K]: CSSTokensWithType<
//             Tokens[K],
//             InheritedType
//           >
//         }>
//     : never

// export type CSSTokens<Tokens> = CSSTokensWithType<Tokens, never>

// // CSSVars recursively converts CSS tokens to their var() equivalents
// // Special handling: if an object has all the typography properties (from SanityFontStyleCSSTokens),
// // preserve its structure and convert each property to a CSS var
// export type CSSVars<T> = T extends string
//   ? `var(--${string})`
//   : T extends object
//     ? // Check if this looks like a typography token object (has fontFamily, fontSize, etc.)
//       'fontFamily' extends keyof T
//       ? 'fontSize' extends keyof T
//         ? 'lineHeight' extends keyof T
//           ? // This is a typography token object - preserve structure
//             {[K in keyof T]: `var(--${string})`}
//           : // Regular object - recurse
//             {[K in keyof T]: CSSVars<T[K]>}
//         : {[K in keyof T]: CSSVars<T[K]>}
//       : // Regular object - recurse
//         {[K in keyof T]: CSSVars<T[K]>}
//     : `var(--${string})`

import type {SanityTypographyToken} from '@sanity/ui-tokens/lib'

import type {Unpack} from '../util/types'

export type SanityTypographyCSSTokens = {
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

type TokenLeaf = {
  $value: unknown
}

type TokenType<T> = T extends {$type: infer U} ? U : never

type NextInheritedType<T, InheritedType> = [TokenType<T>] extends [never]
  ? InheritedType
  : TokenType<T>

type IsExplicitTypographyToken<T> = T extends {$value: unknown; $type: 'typography'}
  ? true
  : T extends SanityTypographyToken
    ? true
    : false

type IsInheritedTypographyToken<T, InheritedType> = T extends TokenLeaf
  ? [TokenType<T>] extends [never]
    ? [InheritedType] extends ['typography']
      ? true
      : false
    : false
  : false

type IsTypographyToken<T, InheritedType> =
  IsExplicitTypographyToken<T> extends true ? true : IsInheritedTypographyToken<T, InheritedType>

type CSSLeafValue<T, InheritedType> =
  IsTypographyToken<T, InheritedType> extends true ? SanityTypographyCSSTokens : string

type CSSObjectValue<T, InheritedType> = Unpack<{
  [K in keyof T as K extends `$${string}` ? never : K]: CSSTokensInner<
    T[K],
    NextInheritedType<T, InheritedType>
  >
}>

type CSSTokensInner<T, InheritedType = never> = T extends TokenLeaf
  ? CSSLeafValue<T, InheritedType>
  : T extends object
    ? CSSObjectValue<T, InheritedType>
    : never

export type CSSTokens<T> = CSSTokensInner<T>

type TypographyShape = Record<keyof SanityTypographyCSSTokens, unknown>

type CSSVar = `var(--${string})`

export type CSSVars<T> = T extends string
  ? CSSVar
  : T extends TypographyShape
    ? {[K in keyof T]: CSSVar}
    : T extends object
      ? {[K in keyof T]: CSSVars<T[K]>}
      : CSSVar
