import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_API_PROJECT_ID ?? 'mos42crl'
const dataset = import.meta.env.VITE_SANITY_API_DATASET ?? 'production'

// `vX` opts into the experimental API version required for the
// `text::semanticSimilarity()` GROQ function. The dataset is public, so no
// token is needed for reads (CORS is configured for the showcase origins).
export const searchClient = createClient({
  projectId,
  dataset,
  apiVersion: 'vX',
  useCdn: true,
})
