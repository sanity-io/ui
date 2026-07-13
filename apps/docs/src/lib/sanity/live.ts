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
 * is never wanted. Carries its own `'use cache'` boundary.
 */
export async function sanityFetchMetadata<const QueryString extends string>(options: {
  query: QueryString
  params?: QueryParams
  perspective: LivePerspective
}) {
  'use cache'
  const {query, params = {}, perspective} = options
  const {data} = await sanityFetch({query, params, perspective, stega: false})
  return {data}
}

/**
 * For usage within `generateStaticParams` only: `perspective` cookies aren't
 * available at build time and `stega` is never wanted in route params.
 */
export async function sanityFetchStaticParams<const QueryString extends string>(options: {
  query: QueryString
  params?: QueryParams
}) {
  'use cache'
  const {query, params = {}} = options
  const {data} = await sanityFetch({query, params, perspective: 'published', stega: false})
  return {data}
}
