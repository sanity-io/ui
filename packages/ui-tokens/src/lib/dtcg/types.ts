import type {z} from 'zod'

import type {
  _DTCGBooleanTokenSchema,
  _DTCGBooleanValueSchema,
  _DTCGBorderTokenSchema,
  _DTCGBorderValueSchema,
  _DTCGColorTokenSchema,
  _DTCGColorValueSchema,
  _DTCGCubicBezierTokenSchema,
  _DTCGDimensionTokenSchema,
  _DTCGDimensionValueSchema,
  _DTCGDurationTokenSchema,
  _DTCGDurationValueSchema,
  _DTCGFontFamilyTokenSchema,
  _DTCGFontFamilyValueSchema,
  _DTCGFontWeightTokenSchema,
  _DTCGFontWeightValueSchema,
  _DTCGNumberTokenSchema,
  _DTCGNumberValueSchema,
  _DTCGShadowTokenSchema,
  _DTCGShadowValueSchema,
  _DTCGStringTokenSchema,
  _DTCGStringValueSchema,
  _DTCGTokenAliasSchema,
  _DTCGTypographyTokenSchema,
  _DTCGTypographyValueSchema,
} from './schema'

/** @internal */
export type _DTCGTokenAlias = z.infer<typeof _DTCGTokenAliasSchema>

/** @internal */
export type _DTCGBooleanValue = z.infer<typeof _DTCGBooleanValueSchema>

/** @internal */
export type _DTCGBorderValue = z.infer<typeof _DTCGBorderValueSchema>

/** @internal */
export type _DTCGNumberValue = z.infer<typeof _DTCGNumberValueSchema>

/** @internal */
export type _DTCGStringValue = z.infer<typeof _DTCGStringValueSchema>

/** @internal */
export type _DTCGColorValue = z.infer<typeof _DTCGColorValueSchema>

/** @internal */
export type _DTCGDimensionValue = z.infer<typeof _DTCGDimensionValueSchema>

/** @internal */
export type _DTCGDurationValue = z.infer<typeof _DTCGDurationValueSchema>

/** @internal */
export type _DTCGShadowValue = z.infer<typeof _DTCGShadowValueSchema>

/** @internal */
export type _DTCGFontFamilyValue = z.infer<typeof _DTCGFontFamilyValueSchema>

/** @internal */
export type _DTCGFontWeightValue = z.infer<typeof _DTCGFontWeightValueSchema>

/** @internal */
export type _DTCGTypographyValue = z.infer<typeof _DTCGTypographyValueSchema>

/** @internal */
export type _DTCGBooleanToken = z.infer<typeof _DTCGBooleanTokenSchema>

/** @internal */
export type _DTCGBorderToken = z.infer<typeof _DTCGBorderTokenSchema>

/** @internal */
export type _DTCGColorToken = z.infer<typeof _DTCGColorTokenSchema>

/** @internal */
export type _DTCGDimensionToken = z.infer<typeof _DTCGDimensionTokenSchema>

/** @internal */
export type _DTCGFontFamilyToken = z.infer<typeof _DTCGFontFamilyTokenSchema>

/** @internal */
export type _DTCGFontWeightToken = z.infer<typeof _DTCGFontWeightTokenSchema>

/** @internal */
export type _DTCGDurationToken = z.infer<typeof _DTCGDurationTokenSchema>

/** @internal */
export type _DTCGCubicBezierToken = z.infer<typeof _DTCGCubicBezierTokenSchema>

/** @internal */
export type _DTCGNumberToken = z.infer<typeof _DTCGNumberTokenSchema>

/** @internal */
export type _DTCGStringToken = z.infer<typeof _DTCGStringTokenSchema>

/** @internal */
export type _DTCGShadowToken = z.infer<typeof _DTCGShadowTokenSchema>

/** @internal */
export type _DTCGTypographyToken = z.infer<typeof _DTCGTypographyTokenSchema>

/** @internal */
export type _DTCGToken =
  | _DTCGBooleanToken
  | _DTCGBorderToken
  | _DTCGColorToken
  | _DTCGDimensionToken
  | _DTCGFontFamilyToken
  | _DTCGFontWeightToken
  | _DTCGDurationToken
  | _DTCGCubicBezierToken
  | _DTCGNumberToken
  | _DTCGStringToken
  | _DTCGShadowToken
  | _DTCGTypographyToken
