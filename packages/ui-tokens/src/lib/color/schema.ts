import {z} from 'zod'

import {_DTCGColorTokenSchema, _DTCGColorValueSchema, _DTCGTokenAliasSchema} from '../dtcg/schema'
import {SanityTokenScopeSchema} from '../sanity/schema'

/** @internal */
export const SanityColorStopSchema = z.object({
  color: z.union([_DTCGColorValueSchema, _DTCGTokenAliasSchema]),
  stop: z.number().min(0).max(1),
})

/** @internal */
export const SanityColorExtensionsSchema = z.object({
  'io.sanity.expr': z
    .object({
      v: z.literal(1),
      op: z.literal('mix'),
      space: z.enum(['srgb', 'oklab']),
      stops: z.tuple([SanityColorStopSchema, SanityColorStopSchema]),
      hue: z.enum(['shorter', 'longer', 'increasing', 'decreasing']).optional(),
      alpha: z.enum(['premultiply']).optional(),
    })
    .optional(),
  'io.sanity.name': z.string().optional(),
  'io.sanity.opacity': z.number().min(0).max(1).optional(),
  'io.sanity.scopes': z.array(SanityTokenScopeSchema).optional(),
})

/** @internal */
export const SanityColorTokenSchema = _DTCGColorTokenSchema.and(
  z.object({
    $extensions: SanityColorExtensionsSchema.optional(),
  }),
)
