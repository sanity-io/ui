import {z} from 'zod'

import {
  _DTCGDimensionValueSchema,
  _DTCGFontFamilyTokenSchema,
  _DTCGFontWeightTokenSchema,
  _DTCGTypographyTokenSchema,
} from '../../lib/dtcg/schema'

/** @internal */
export const SanityFontFamilyExtensionSchema = z.object({
  'io.sanity': z.object({
    figma: z.object({value: z.string()}),
    textBoxEdge: z.enum(['cap-height']).optional(),
  }),
})

/** @internal */
export const SanityFontFamilyTokenSchema = _DTCGFontFamilyTokenSchema.and(
  z.object({
    $extensions: SanityFontFamilyExtensionSchema,
  }),
)

/** @internal */
export const SanityTypographyExtensionSchema = z.object({
  'io.sanity': z.object({
    ascenderHeight: _DTCGDimensionValueSchema,
    descenderHeight: _DTCGDimensionValueSchema,
    iconSize: _DTCGDimensionValueSchema,
    customIconSize: _DTCGDimensionValueSchema,
    lineHeight: _DTCGDimensionValueSchema,
  }),
})

/** @internal */
export const SanityTypographyTokenSchema = _DTCGTypographyTokenSchema.and(
  z.object({
    $extensions: SanityTypographyExtensionSchema,
  }),
)

/** @internal */
export const SanityFontWeightExtensionSchema = z.object({
  'io.sanity': z.object({
    figma: z.object({value: z.string()}),
  }),
})

/** @internal */
export const SanityFontWeightTokenSchema = _DTCGFontWeightTokenSchema.and(
  z.object({
    $extensions: SanityFontWeightExtensionSchema,
  }),
)
