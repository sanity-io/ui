import {createClient} from 'next-sanity'

const basePath = (process.env.__NEXT_ROUTER_BASEPATH as string) || ''
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION,
  perspective: 'published',
  // Enables stega encoding (used when `sanityFetch` is called with `stega: true`).
  // The URL is resolved relative to the page origin; the embedded studio lives
  // at `/studio` under the app's `/ui` basePath.
  stega: {studioUrl: `${basePath}/studio`},
})
