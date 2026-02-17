import {z} from 'zod'

import {DTCGColorTokenSchema, DTCGColorValueSchema, DTCGTokenAliasSchema} from '../_dtcg/schema'
import {SanityTokenScopeSchema} from '../_sanity/schema'

/** @internal */
export const SanityColorStopSchema = z.object({
  color: z.union([DTCGColorValueSchema, DTCGTokenAliasSchema]),
  stop: z.number().min(0).max(1),
})

/** @internal */
export const SanityColorExtensionSchema = z.object({
  'io.sanity': z
    .object({
      expr: z
        .object({
          v: z.literal(1),
          op: z.literal('mix'),
          space: z.enum(['srgb', 'oklab']),
          stops: z.tuple([
            z.union([SanityColorStopSchema, SanityColorStopSchema]),
            z.union([SanityColorStopSchema, SanityColorStopSchema]),
          ]),
          hue: z.enum(['shorter', 'longer', 'increasing', 'decreasing']).optional(),
          alpha: z.enum(['premultiply']).optional(),
        })
        .optional(),
      opacity: z.number().min(0).max(1).optional(),
      scopes: z.array(SanityTokenScopeSchema).optional(),
    })
    .optional(),
})

/** @internal */
export const SanityColorTokenSchema = DTCGColorTokenSchema.and(
  z.object({
    $extensions: SanityColorExtensionSchema.optional(),
  }),
)

/** @internal */
export type SanityColorToken = z.infer<typeof SanityColorTokenSchema>
