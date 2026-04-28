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
