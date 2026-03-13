import type {z} from 'zod'

import type {
  SanityDimensionTokenSchema,
  SanityNumberTokenSchema,
  SanityTokenScopeSchema,
} from './schema'

/** @internal */
export type SanityTokenScope = z.infer<typeof SanityTokenScopeSchema>

/** @public */
export type SanityDimensionToken = z.infer<typeof SanityDimensionTokenSchema>

/** @public */
export type SanityNumberToken = z.infer<typeof SanityNumberTokenSchema>
