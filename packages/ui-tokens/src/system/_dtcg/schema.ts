import {z} from 'zod'

import {numericEnum} from './zod'

// utilities

/** @internal */
export const DTCGTokenAliasSchema = z.string().regex(/^\{[^{}\s]+\}$/)

/** @internal */
export type DTCGTokenAlias = z.infer<typeof DTCGTokenAliasSchema>

/** @internal */
const UnitIntervalSchema = z.number().min(0).max(1)

// values

/** @internal */
export const DTCGNumberValueSchema = z.number()

/** @internal */
export type DTCGNumberValue = z.infer<typeof DTCGNumberValueSchema>

/** @internal */
export const DTCGStringValueSchema = z.string()

/** @internal */
export type DTCGStringValue = z.infer<typeof DTCGStringValueSchema>

/** @internal */
export const DTCGColorValueSchema = z.object({
  colorSpace: z.literal('srgb'),
  components: z.tuple([UnitIntervalSchema, UnitIntervalSchema, UnitIntervalSchema]),
  alpha: UnitIntervalSchema.optional(),
  hex: z
    .string()
    .regex(/^#[0-9a-fA-F]{3,6}$/)
    .optional(),
})

/** @internal */
export type DTCGColorValue = z.infer<typeof DTCGColorValueSchema>

/** @internal */
export const DTCGDimensionValueSchema = z.object({
  value: z.number(),
  unit: z.enum(['px', 'rem']),
})

/** @internal */
export type DTCGDimensionValue = z.infer<typeof DTCGDimensionValueSchema>

/** @internal */
export const DTCGDurationValueSchema = z.object({
  value: z.number(),
  unit: z.enum(['ms', 's']),
})

/** @internal */
export type DTCGDurationValue = z.infer<typeof DTCGDurationValueSchema>

/** @internal */
export const DTCGShadowValueSchema = z.object({
  color: z.union([DTCGColorValueSchema, DTCGTokenAliasSchema]),
  offsetX: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
  offsetY: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
  blur: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
  spread: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
  inset: z.boolean().optional(),
})

/** @internal */
export type DTCGShadowValue = z.infer<typeof DTCGShadowValueSchema>

/** @internal */
export const DTCGFontFamilyValueSchema = z.union([z.string(), z.array(z.string())])

/** @internal */
export type DTCGFontFamilyValue = z.infer<typeof DTCGFontFamilyValueSchema>

const FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

/** @internal */
export const DTCGFontWeightValueSchema = numericEnum(FONT_WEIGHTS)

/** @internal */
export type DTCGFontWeightValue = z.infer<typeof DTCGFontWeightValueSchema>

// tokens

/** @internal */
export const DTCGColorTokenSchema = z.object({
  $type: z.literal('color'),
  $value: z.union([DTCGColorValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGColorToken = z.infer<typeof DTCGColorTokenSchema>

/** @internal */
export const DTCGDimensionTokenSchema = z.object({
  $type: z.literal('dimension'),
  $value: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGDimensionToken = z.infer<typeof DTCGDimensionTokenSchema>

/** @internal */
export const DTCGFontFamilyTokenSchema = z.object({
  $type: z.literal('fontFamily'),
  $value: z.union([DTCGFontFamilyValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGFontFamilyToken = z.infer<typeof DTCGFontFamilyTokenSchema>

/**
 * Represents a font weight. The $type property MUST be set to the string `fontWeight`. The value
 * must either be a number value in the range [1, 1000] or one of the pre-defined string values
 * defined in the table below.
 *
 * Lower numbers represent lighter weights, and higher numbers represent thicker weights, as per the
 * OpenType wght tag specification. The pre-defined string values are aliases for specific numeric
 * values. For example `100`, `"thin"` and `"hairline"` are all the exact same value.
 *
 * numeric value  string value aliases
 * 100            thin, hairline
 * 200            extra-light, ultra-light
 * 300            light
 * 400            normal, regular, book
 * 500            medium
 * 600            semi-bold, demi-bold
 * 700            bold
 * 800            extra-bold, ultra-bold
 * 900            black, heavy
 * 950            extra-black, ultra-black
 *
 * @internal
 */
export const DTCGFontWeightTokenSchema = z.object({
  $type: z.literal('fontWeight'),
  $value: z.union([DTCGFontWeightValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGFontWeightToken = z.infer<typeof DTCGFontWeightTokenSchema>

/** @internal */
export const DTCGDurationTokenSchema = z.object({
  $type: z.literal('duration'),
  $value: z.union([DTCGDurationValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGDurationToken = z.infer<typeof DTCGDurationTokenSchema>

/** @internal */
export const DTCGCubicBezierTokenSchema = z.object({
  $type: z.literal('cubicBezier'),
  $value: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGCubicBezierToken = z.infer<typeof DTCGCubicBezierTokenSchema>

/** @internal */
export const DTCGNumberTokenSchema = z.object({
  $type: z.literal('number'),
  $value: z.union([DTCGNumberValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGNumberToken = z.infer<typeof DTCGNumberTokenSchema>

/** @internal */
export const DTCGStringTokenSchema = z.object({
  $type: z.literal('string'),
  $value: z.union([DTCGStringValueSchema, DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGStringToken = z.infer<typeof DTCGStringTokenSchema>

/** @internal */
export const DTCGShadowTokenSchema = z.object({
  $type: z.literal('shadow'),
  $value: z.union([DTCGShadowValueSchema, z.array(DTCGShadowValueSchema), DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export type DTCGShadowToken = z.infer<typeof DTCGShadowTokenSchema>

/**
 *
 * Represents a typographic style. The $type property MUST be set to the string typography.
 * The value MUST be an object with the following properties:
 *
 * - `fontFamily`: The typography's font. The value of this property MUST be a valid font family
 *   value or a reference to a font family token.
 * - `fontSize`: The size of the typography. The value of this property MUST be a valid dimension
 *   value or a reference to a dimension token.
 * - `fontWeight`: The weight of the typography. The value of this property MUST be a valid font
 *   weight or a reference to a font weight token.
 * - `letterSpacing`: The horizontal spacing between characters. The value of this property MUST be
 *   a valid dimension value or a reference to a dimension token.
 * - `lineHeight`: The vertical spacing between lines of typography. The value of this property
 *   MUST be a valid number value or a reference to a number token. The number SHOULD be interpreted
 *   as a multiplier of the fontSize.
 *
 * @internal
 */
export const DTCGTypographyTokenSchema = z.object({
  $type: z.literal('typography'),
  $value: z.object({
    fontFamily: z.union([DTCGFontFamilyValueSchema, DTCGTokenAliasSchema]),
    fontSize: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
    fontWeight: z.union([DTCGFontWeightValueSchema, DTCGTokenAliasSchema]),
    letterSpacing: z.union([DTCGDimensionValueSchema, DTCGTokenAliasSchema]),
    lineHeight: z.union([DTCGNumberValueSchema, DTCGTokenAliasSchema]),
  }),
})

/** @internal */
export type DTCGTypographyToken = z.infer<typeof DTCGTypographyTokenSchema>

/** @internal */
export type DTCGToken =
  | DTCGColorToken
  | DTCGDimensionToken
  | DTCGFontFamilyToken
  | DTCGFontWeightToken
  | DTCGDurationToken
  | DTCGCubicBezierToken
  | DTCGNumberToken
  | DTCGStringToken
  | DTCGShadowToken
  | DTCGTypographyToken
