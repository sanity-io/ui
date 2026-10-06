/**
 * A `useSyncExternalStore` store for whether one media query matches.
 *
 * @internal
 */
export interface _MediaQueryStore {
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => boolean
}

let matchMedia: typeof window.matchMedia | undefined
const mediaQueryLists = new Map<string, MediaQueryList>()
const mediaQueryStores = new Map<string, _MediaQueryStore>()

/**
 * The `MediaQueryList` for a query, created once per query string and shared by every caller.
 * `window.matchMedia` evaluates the query and allocates a new list on every call, so hooks must
 * not call it per component instance, let alone per render. Client-only, like `window.matchMedia`.
 *
 * The cache follows `window.matchMedia` itself: when a different function is installed (a test
 * mock, a late polyfill), the lists the previous one handed out are dropped.
 *
 * @internal
 */
export function _getMediaQueryList(query: string): MediaQueryList {
  if (matchMedia !== window.matchMedia) {
    matchMedia = window.matchMedia
    mediaQueryLists.clear()
  }

  let mediaQueryList = mediaQueryLists.get(query)

  if (!mediaQueryList) {
    mediaQueryList = window.matchMedia(query)
    mediaQueryLists.set(query, mediaQueryList)
  }

  return mediaQueryList
}

/**
 * The store for a query, created once per query string. Subscribers share one `change` listener
 * on the query's `MediaQueryList`, attached when the first subscriber arrives and removed when
 * the last one leaves. Creating a store touches nothing in the DOM; `window.matchMedia` is only
 * reached through `subscribe` and `getSnapshot`, which React never calls on the server.
 *
 * @internal
 */
export function _getMediaQueryStore(query: string): _MediaQueryStore {
  let store = mediaQueryStores.get(query)

  if (!store) {
    store = _createMediaQueryStore(query)
    mediaQueryStores.set(query, store)
  }

  return store
}

function _createMediaQueryStore(query: string): _MediaQueryStore {
  const subscribers = new Set<() => void>()
  let unlisten: (() => void) | undefined

  const listen = () => {
    const mediaQueryList = _getMediaQueryList(query)
    const handleChange = () => {
      for (const subscriber of subscribers) {
        subscriber()
      }
    }

    mediaQueryList.addEventListener('change', handleChange)

    return () => mediaQueryList.removeEventListener('change', handleChange)
  }

  return {
    getSnapshot: () => _getMediaQueryList(query).matches,
    subscribe(onStoreChange) {
      if (subscribers.size === 0) unlisten = listen()
      subscribers.add(onStoreChange)

      return () => {
        subscribers.delete(onStoreChange)

        if (subscribers.size === 0) {
          unlisten?.()
          unlisten = undefined
        }
      }
    },
  }
}
