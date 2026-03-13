import {z} from 'zod'

import {_FONT_WEIGHTS} from './constants'
import {numericEnum} from './zod'

// utilities

type _DTCGTokenAliasValue = `{${string}}`

/** @internal */
export const _DTCGTokenAliasSchema = z.custom<_DTCGTokenAliasValue>(
  (value): value is _DTCGTokenAliasValue =>
    typeof value === 'string' && /^\{[^{}\s]+\}$/.test(value),
)

/** @internal */
const UnitIntervalSchema = z.number().min(0).max(1)

// values

/** @internal */
export const _DTCGNumberValueSchema = z.number()

/** @internal */
export const _DTCGStringValueSchema = z.string()

/** @internal */
export const _DTCGColorValueSchema = z.object({
  colorSpace: z.union([z.literal('srgb'), z.literal('oklch')]),
  components: z.tuple([UnitIntervalSchema, UnitIntervalSchema, UnitIntervalSchema]),
  alpha: UnitIntervalSchema.optional(),
  hex: z
    .string()
    .regex(/^#[0-9a-fA-F]{3,6}$/)
    .optional(),
})

/** @internal */
export const _DTCGDimensionValueSchema = z.object({
  value: z.number(),
  unit: z.enum(['px', 'rem']),
})

/** @internal */
export const _DTCGDurationValueSchema = z.object({
  value: z.number(),
  unit: z.enum(['ms', 's']),
})

/** @internal */
export const _DTCGShadowValueSchema = z.object({
  color: z.union([_DTCGColorValueSchema, _DTCGTokenAliasSchema]),
  offsetX: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  offsetY: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  blur: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  spread: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  inset: z.boolean().optional(),
})

/** @internal */
export const _DTCGFontFamilyValueSchema = z.union([z.string(), z.array(z.string())])

/** @internal */
export const _DTCGFontWeightValueSchema = numericEnum(_FONT_WEIGHTS)

/** @internal */
export const _DTCGBorderValueSchema = z.object({
  color: z.union([_DTCGColorValueSchema, _DTCGTokenAliasSchema]),
  width: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  style: z.enum(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']),
})

/** @internal */
export const _DTCGBooleanValueSchema = z.boolean()

/** @internal */
export const _DTCGTypographyValueSchema = z.object({
  fontFamily: z.union([_DTCGFontFamilyValueSchema, _DTCGTokenAliasSchema]),
  fontSize: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  fontWeight: z.union([_DTCGFontWeightValueSchema, _DTCGTokenAliasSchema]),
  letterSpacing: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  lineHeight: z.union([_DTCGNumberValueSchema, _DTCGTokenAliasSchema]),
})

// tokens

/** @internal */
export const _DTCGBooleanTokenSchema = z.object({
  $type: z.literal('boolean'),
  $value: z.union([_DTCGBooleanValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGBorderTokenSchema = z.object({
  $type: z.literal('border'),
  $value: z.union([_DTCGBorderValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGColorTokenSchema = z.object({
  $type: z.literal('color'),
  $value: z.union([_DTCGColorValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGDimensionTokenSchema = z.object({
  $type: z.literal('dimension'),
  $value: z.union([_DTCGDimensionValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGFontFamilyTokenSchema = z.object({
  $type: z.literal('fontFamily'),
  $value: z.union([_DTCGFontFamilyValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

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
export const _DTCGFontWeightTokenSchema = z.object({
  $type: z.literal('fontWeight'),
  $value: z.union([_DTCGFontWeightValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGDurationTokenSchema = z.object({
  $type: z.literal('duration'),
  $value: z.union([_DTCGDurationValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGCubicBezierTokenSchema = z.object({
  $type: z.literal('cubicBezier'),
  $value: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGNumberTokenSchema = z.object({
  $type: z.literal('number'),
  $value: z.union([_DTCGNumberValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGStringTokenSchema = z.object({
  $type: z.literal('string'),
  $value: z.union([_DTCGStringValueSchema, _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

/** @internal */
export const _DTCGShadowTokenSchema = z.object({
  $type: z.literal('shadow'),
  $value: z.union([_DTCGShadowValueSchema, z.array(_DTCGShadowValueSchema), _DTCGTokenAliasSchema]),
  $description: z.string().optional(),
})

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
export const _DTCGTypographyTokenSchema = z.object({
  $type: z.literal('typography'),
  $value: _DTCGTypographyValueSchema,
})
