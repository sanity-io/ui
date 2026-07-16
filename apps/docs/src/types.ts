// Array value type for every Portable Text item shape across all registered queries.

import type {InferValue, SanityQueries} from 'next-sanity'

// For usage with <PortableText>, and complex block types
export type PortableTextValue = InferValue<SanityQueries[keyof SanityQueries]>
