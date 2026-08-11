import {type QueryParams} from 'next-sanity'
import {defineLive, type LivePerspective, resolvePerspectiveFromCookies} from 'next-sanity/live'
import {cookies, draftMode} from 'next/headers'

import {client} from './client'
import {token} from './token'

export const {SanityLive, sanityFetch} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  // `perspective` and `stega` become required on every `sanityFetch` call and
  // `includeDrafts` on `<SanityLive />`, so draft state is always passed
  // explicitly into `'use cache'` boundaries instead of read from request APIs.
  strict: true,
})

/**
 * The app's one shared `'use cache'` boundary. `sanityFetch` calls
 * `cacheTag`/`cacheLife` internally but doesn't create the boundary, so this
 * wrapper provides it once and callers don't add their own. `query`, `params`,
 * `perspective` and `stega` are all serializable, so they key the cache entry:
 * identical fetches from different components share one entry, and published
 * and draft content never collide.
 *
 * Call `sanityFetch` directly only from a component that carries its own
 * `'use cache'` because caching the rendered JSX is worth a second boundary.
 */
export const cachedSanity: typeof sanityFetch = async (options) => {
  'use cache'
  return sanityFetch(options)
}

export interface DynamicFetchOptions {
  perspective: LivePerspective
  stega: boolean
}

/**
 * Resolves `perspective` and `stega` from request-time APIs. Must be called
 * outside `'use cache'` boundaries; the result is passed in as plain props.
 */
export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const {isEnabled: isDraftMode} = await draftMode()

  if (!isDraftMode) {
    return {perspective: 'published', stega: false}
  }

  const jar = await cookies()
  const perspective = await resolvePerspectiveFromCookies({cookies: jar})

  return {perspective: perspective ?? 'drafts', stega: true}
}

/**
 * For usage within `generateMetadata` and other metadata routes, where stega
 * is never wanted. `perspective` still has to be resolved, so a standalone
 * preview window reflects the content release it is previewing.
 */
export async function cachedSanityMetadata<const QueryString extends string>(options: {
  query: QueryString
  params?: QueryParams
  perspective: LivePerspective
}) {
  const {query, params = {}, perspective} = options
  const {data} = await cachedSanity({query, params, perspective, stega: false})
  return {data}
}

/**
 * For usage within `generateStaticParams` only: `perspective` cookies aren't
 * available at build time and `stega` is never wanted in route params.
 */
export async function cachedSanityStaticParams<const QueryString extends string>(options: {
  query: QueryString
  params?: QueryParams
}) {
  const {query, params = {}} = options
  const {data} = await cachedSanity({query, params, perspective: 'published', stega: false})
  return {data}
}
