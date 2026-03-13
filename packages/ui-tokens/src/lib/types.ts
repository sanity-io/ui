import type {SanityColorToken} from '../color/lib/types'
import type {
  SanityFontFamilyToken,
  SanityFontWeightToken,
  SanityTypopgrahyToken,
} from '../font/lib/types'
import type {
  _DTCGBooleanToken,
  _DTCGBorderToken,
  _DTCGColorToken,
  _DTCGCubicBezierToken,
  _DTCGDimensionToken,
  _DTCGDurationToken,
  _DTCGFontFamilyToken,
  _DTCGFontWeightToken,
  _DTCGNumberToken,
  _DTCGShadowToken,
  _DTCGStringToken,
  _DTCGTokenAlias,
  _DTCGTypographyToken,
} from './dtcg/types'
import type {SanityDimensionToken, SanityNumberToken} from './sanity/types'

type TokenByType = {
  boolean: _DTCGBooleanToken
  border: _DTCGBorderToken
  color: SanityColorToken // _DTCGColorToken
  dimension: SanityDimensionToken // _DTCGDimensionToken
  fontFamily: SanityFontFamilyToken // _DTCGFontFamilyToken
  fontWeight: SanityFontWeightToken // _DTCGFontWeightToken
  duration: _DTCGDurationToken
  cubicBezier: _DTCGCubicBezierToken
  number: SanityNumberToken // _DTCGNumberToken
  string: _DTCGStringToken
  shadow: _DTCGShadowToken
  typography: SanityTypopgrahyToken // _DTCGTypographyToken
}

/** @public */
export type SanityToken = TokenByType[keyof TokenByType]

/** @public */
export type TokenType = keyof TokenByType

/** @public */
export type ExplicitToken<K extends TokenType> = Omit<TokenByType[K], '$type'> & {$type: K}

type InheritedToken<K extends TokenType> = Omit<TokenByType[K], '$type'>

type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never

/** @internal */
export type _DTCGTokenNode = SanityToken | _DTCGTokenGroup

/** @internal */
export type _DTCGTokenGroup = {
  $type?: TokenType
  $description?: string
  [key: string]: unknown
}

type InferType<T, Fallback extends TokenType | undefined> = T extends {$type?: infer U}
  ? U extends TokenType
    ? U
    : Fallback
  : Fallback

type ValidateToken<T, Inherited extends TokenType | undefined> = T extends {$type: infer U}
  ? U extends TokenType
    ? Exact<T, ExplicitToken<U>>
    : never
  : Inherited extends TokenType
    ? Exact<T, InheritedToken<Inherited>>
    : T extends ExplicitToken<TokenType>
      ? T
      : never

type ValidateNode<T, Inherited extends TokenType | undefined> = T extends {$value: unknown}
  ? ValidateToken<T, Inherited>
  : T extends object
    ? ValidateGroup<T, Inherited>
    : never

/** @internal */
export type ValidateGroup<T, Inherited extends TokenType | undefined = undefined> = T extends object
  ? {
      [K in keyof T]: K extends `$${string}` ? T[K] : ValidateNode<T[K], InferType<T, Inherited>>
    }
  : never

type TokenInputByType = {
  [K in TokenType]: Omit<TokenByType[K], '$type'> & {$type: K}
}

/** @public */
export type TokenInput<T extends TokenType = TokenType> = TokenInputByType[T]

/** @public */
export type TokenGroup<TKey extends PropertyKey> = Record<TKey, unknown>

/** @public */
export type TokenScale<TKey extends PropertyKey, TType extends TokenType> = {
  $type: TType
  $description?: string
} & Record<TKey, unknown>

/** @public */
export type TokenContract<T> = T extends {$value: unknown}
  ? {$value: unknown; $type?: unknown; $description?: string}
  : T extends object
    ? {[K in keyof T]: TokenContract<T[K]>}
    : T

export {}
