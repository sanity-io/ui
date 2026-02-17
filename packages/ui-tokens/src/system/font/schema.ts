import {z} from 'zod'

import {
  DTCGDimensionValueSchema,
  DTCGFontFamilyTokenSchema,
  DTCGFontWeightTokenSchema,
  DTCGTypographyTokenSchema,
} from '../_dtcg/schema'

/** @internal */
export const SanityFontFamilyExtensionSchema = z.object({
  'io.sanity': z.object({
    figma: z.object({value: z.string()}),
    textBoxEdge: z.enum(['cap-height']).optional(),
  }),
})

/** @internal */
export const SanityFontFamilyTokenSchema = DTCGFontFamilyTokenSchema.and(
  z.object({
    $extensions: SanityFontFamilyExtensionSchema,
  }),
)

/** @internal */
export type SanityFontFamilyToken = z.infer<typeof SanityFontFamilyTokenSchema>

/** @internal */
export const SanityFontStyleExtensionSchema = z.object({
  'io.sanity': z.object({
    ascenderHeight: DTCGDimensionValueSchema,
    descenderHeight: DTCGDimensionValueSchema,
    iconSize: DTCGDimensionValueSchema,
    customIconSize: DTCGDimensionValueSchema,
    lineHeight: DTCGDimensionValueSchema,
  }),
})

/** @internal */
export const SanityFontStyleTokenSchema = DTCGTypographyTokenSchema.and(
  z.object({
    $extensions: SanityFontStyleExtensionSchema,
  }),
)

/** @internal */
export type SanityFontStyleToken = z.infer<typeof SanityFontStyleTokenSchema>

/** @internal */
export const SanityFontWeightExtensionSchema = z.object({
  'io.sanity': z.object({
    figma: z.object({value: z.string()}),
  }),
})

/** @internal */
export const SanityFontWeightTokenSchema = DTCGFontWeightTokenSchema.and(
  z.object({
    $extensions: SanityFontWeightExtensionSchema,
  }),
)

/** @internal */
export type SanityFontWeightToken = z.infer<typeof SanityFontWeightTokenSchema>
