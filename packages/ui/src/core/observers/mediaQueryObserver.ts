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
 * A list stays cached while its query store has subscribers and is dropped together with the
 * store (see `_getMediaQueryStore`). The cache also follows `window.matchMedia` itself: when a
 * different function is installed (a test mock, a late polyfill), the lists the previous one
 * handed out are dropped.
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
 * The store for a query, shared by every component that subscribes to it. Subscribers share one
 * `change` listener on the query's `MediaQueryList`, attached when the first subscriber arrives.
 * When the last subscriber leaves, the listener is removed and the store and its list are
 * evicted, so caller-provided queries that stop being used do not accumulate; the next
 * subscriber gets a fresh store. Creating a store touches nothing in the DOM, `window.matchMedia`
 * is only reached through `subscribe` and `getSnapshot`, which React never calls on the server,
 * and on the server nothing is cached at all.
 *
 * @internal
 */
export function _getMediaQueryStore(query: string): _MediaQueryStore {
  if (typeof window === 'undefined') return _createMediaQueryStore(query)

  let store = mediaQueryStores.get(query)

  if (!store) {
    store = _createMediaQueryStore(query)
    mediaQueryStores.set(query, store)
  }

  return store
}

function _createMediaQueryStore(query: string): _MediaQueryStore {
  const subscribers = new Set<() => void>()
  // The list the `change` listener is attached to, while there are subscribers. `getSnapshot`
  // reads from that same list, so the value and the notifications always agree — also when
  // `window.matchMedia` is replaced in the meantime and the cache starts handing out a new list
  // (which this store picks up once it is subscribed to from scratch again).
  let listening: {mediaQueryList: MediaQueryList; unlisten: () => void} | undefined

  const listen = () => {
    const mediaQueryList = _getMediaQueryList(query)
    const handleChange = () => {
      for (const subscriber of subscribers) {
        subscriber()
      }
    }

    mediaQueryList.addEventListener('change', handleChange)

    return {
      mediaQueryList,
      unlisten: () => mediaQueryList.removeEventListener('change', handleChange),
    }
  }

  const store: _MediaQueryStore = {
    getSnapshot: () => (listening?.mediaQueryList ?? _getMediaQueryList(query)).matches,
    subscribe(onStoreChange) {
      if (!listening) listening = listen()
      subscribers.add(onStoreChange)

      return () => {
        subscribers.delete(onStoreChange)

        if (subscribers.size > 0) return

        listening?.unlisten()
        listening = undefined

        // Evict, unless a newer store has already taken this query over (a component can
        // subscribe to a store it rendered with just after another one evicted it; that store
        // keeps working on its own and is released when the component re-renders)
        if (mediaQueryStores.get(query) === store) {
          mediaQueryStores.delete(query)
          mediaQueryLists.delete(query)
        }
      }
    },
  }

  return store
}
