/**
 * A `useSyncExternalStore` store for whether one media query matches.
 *
 * @internal
 */
export interface _MediaQueryStore {
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => boolean
}

/**
 * How many stores without subscribers a cache keeps. Stores are created while rendering, and a
 * render that is abandoned, suspended, or kept in a hidden `Activity` never subscribes, so
 * nothing else would ever remove them. Beyond this many idle stores the least recently requested
 * one goes; stores with subscribers are never evicted. The limit comfortably covers a theme's
 * breakpoint ranges plus a few preference queries, so steady-state sharing is unaffected.
 *
 * @internal
 */
export const _IDLE_STORE_LIMIT = 32

/**
 * Returns the entry for `key`, moving it to the most recently requested end of `cache`.
 *
 * @internal
 */
export function _getRecentlyUsed<T>(cache: Map<string, T>, key: string): T | undefined {
  const entry = cache.get(key)

  if (entry !== undefined) {
    cache.delete(key)
    cache.set(key, entry)
  }

  return entry
}

/**
 * Keeps `cache` to at most `_IDLE_STORE_LIMIT` entries that `isActive` rejects, dropping the
 * least recently requested ones first.
 *
 * @internal
 */
export function _evictIdle<T>(cache: Map<string, T>, isActive: (entry: T) => boolean): void {
  let idle = 0

  for (const entry of cache.values()) {
    if (!isActive(entry)) idle += 1
  }

  for (const [key, entry] of cache) {
    if (idle <= _IDLE_STORE_LIMIT) return
    if (isActive(entry)) continue

    cache.delete(key)
    idle -= 1
  }
}

let matchMedia: typeof window.matchMedia | undefined
const mediaQueryStores = new Map<string, _MediaQueryStore>()
const activeMediaQueryStores = new WeakSet<_MediaQueryStore>()

/**
 * The store for a query, shared by every component that asks for it, so a query is evaluated
 * once rather than per component instance, let alone per render. Subscribers share one `change`
 * listener on the store's `MediaQueryList`, attached when the first subscriber arrives. When the
 * last subscriber leaves, the listener is removed and the store is evicted, so caller-provided
 * queries that stop being used do not accumulate; the next subscriber gets a fresh store. Stores
 * that render but never subscribe are capped by `_IDLE_STORE_LIMIT`.
 *
 * Creating a store touches nothing in the DOM: `window.matchMedia` is only reached through
 * `subscribe` and `getSnapshot`, which React never calls on the server, and on the server nothing
 * is cached at all. The cache also follows `window.matchMedia` itself: when a different function
 * is installed (a test mock, a late polyfill), idle stores are dropped so the next request
 * evaluates against the replacement, while subscribed stores keep the list their listener is on
 * — snapshot and notifications always come from the same list — until they are let go of.
 *
 * @internal
 */
export function _getMediaQueryStore(query: string): _MediaQueryStore {
  if (typeof window === 'undefined') return _createMediaQueryStore(query)

  if (matchMedia !== window.matchMedia) {
    matchMedia = window.matchMedia

    for (const [key, store] of mediaQueryStores) {
      if (!activeMediaQueryStores.has(store)) mediaQueryStores.delete(key)
    }
  }

  let store = _getRecentlyUsed(mediaQueryStores, query)

  if (!store) {
    store = _createMediaQueryStore(query)
    mediaQueryStores.set(query, store)
    _evictIdle(mediaQueryStores, (entry) => activeMediaQueryStores.has(entry))
  }

  return store
}

function _createMediaQueryStore(query: string): _MediaQueryStore {
  const subscribers = new Set<() => void>()
  let mediaQueryList: MediaQueryList | undefined
  let implementation: typeof window.matchMedia | undefined
  let unlisten: (() => void) | undefined

  // The store's own list, evaluated once and kept for the store's lifetime
  const list = () => {
    if (!mediaQueryList) {
      implementation = window.matchMedia
      mediaQueryList = window.matchMedia(query)
    }

    return mediaQueryList
  }

  const listen = () => {
    const target = list()
    const handleChange = () => {
      for (const subscriber of subscribers) {
        subscriber()
      }
    }

    target.addEventListener('change', handleChange)

    return () => target.removeEventListener('change', handleChange)
  }

  const store: _MediaQueryStore = {
    getSnapshot: () => list().matches,
    subscribe(onStoreChange) {
      if (!unlisten) {
        unlisten = listen()
        activeMediaQueryStores.add(store)

        // A store that is subscribed to after it was evicted — StrictMode's simulated unmount
        // does exactly that, and so does a component committing with a store a sibling's
        // cleanup evicted — takes its place back while nobody else has, so later components
        // share it instead of opening a second listener. Not when its list predates a replaced
        // `window.matchMedia`: then the next request should evaluate against the replacement.
        if (!mediaQueryStores.has(query) && implementation === window.matchMedia) {
          mediaQueryStores.set(query, store)
        }
      }

      subscribers.add(onStoreChange)

      return () => {
        subscribers.delete(onStoreChange)

        if (subscribers.size > 0) return

        unlisten?.()
        unlisten = undefined
        activeMediaQueryStores.delete(store)

        // Evict once the current task is done: React unsubscribes and resubscribes
        // synchronously within a commit (StrictMode does so on every mount), and a store that is
        // back in use by then stays shared. Not when a newer store has taken the query over in
        // the meantime — the orphan keeps working on its own until it is released.
        queueMicrotask(() => {
          if (subscribers.size === 0 && mediaQueryStores.get(query) === store) {
            mediaQueryStores.delete(query)
          }
        })
      }
    },
  }

  return store
}
