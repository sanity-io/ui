import 'server-only'

import {loadQuery as _loadQuery, setServerClient} from '@sanity/react-loader/rsc'
import {draftMode} from 'next/headers'

import {client} from './client'
import {token} from './token'

const serverClient = client.withConfig({token})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = (async (query, params = {}, options = {}) => {
  const {perspective = (await draftMode()).isEnabled ? 'previewDrafts' : 'published'} = options
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  return _loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
  })
}) satisfies typeof _loadQuery
