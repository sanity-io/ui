import {createClient} from '@sanity/client'

const env = (import.meta as unknown as {env?: Record<string, string | undefined>}).env

const projectId = env?.['VITE_SANITY_API_PROJECT_ID'] ?? 'ppsg7ml5'
const dataset = env?.['VITE_SANITY_API_DATASET'] ?? 'icons'

// `vX` opts into the experimental API version required for the
// `text::semanticSimilarity()` GROQ function. The dataset is public, so no
// token is needed for reads (CORS is configured for the workshop origins).
export const searchClient = createClient({
  projectId,
  dataset,
  apiVersion: 'vX',
  useCdn: false,
})
