import {createClient} from 'next-sanity'

import {apiVersion, basePath, dataset, projectId} from '@/constants'

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  perspective: 'published',
  // Enables stega encoding (used when `sanityFetch` is called with `stega: true`).
  // The URL is resolved relative to the page origin; the embedded studio lives
  // at `/studio` under the app's `/ui` basePath.
  stega: {studioUrl: `${basePath}/studio`},
})
