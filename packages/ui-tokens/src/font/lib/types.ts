import type {z} from 'zod'

import type {
  SanityFontFamilyTokenSchema,
  SanityFontWeightTokenSchema,
  SanityTypographyTokenSchema,
} from './schema'

/** @public */
export type SanityFontFamilyToken = z.infer<typeof SanityFontFamilyTokenSchema>

/** @public */
export type SanityTypopgrahyToken = z.infer<typeof SanityTypographyTokenSchema>

/** @public */
export type SanityFontWeightToken = z.infer<typeof SanityFontWeightTokenSchema>
