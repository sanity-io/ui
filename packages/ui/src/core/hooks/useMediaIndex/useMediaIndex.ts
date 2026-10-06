import {useMemo, useSyncExternalStore} from 'react'

import {_getMediaQueryStore, type _MediaQueryStore} from '../../observers/mediaQueryObserver'
import {useTheme_v2} from '../../theme/useTheme'

/**
 * @internal
 */
export interface _MediaStore {
  subscribe: (onStoreChange: () => void) => () => void
  getSnapshot: () => number
}

type MediaQueryMinWidth = `(min-width: ${number}px)`
type MediaQueryMaxWidth = `(max-width: ${number}px)`
type MediaQueryMinMaxWidth = `${MediaQueryMinWidth} and ${MediaQueryMaxWidth}`
type MediaQuery = `screen and ${MediaQueryMinWidth | MediaQueryMaxWidth | MediaQueryMinMaxWidth}`

function _getMediaQuery(media: number[], index: number): MediaQuery {
  if (index === 0) {
    return `screen and (max-width: ${media[index] - 1}px)`
  }

  if (index === media.length) {
    return `screen and (min-width: ${media[index - 1]}px)`
  }

  return `screen and (min-width: ${media[index - 1]}px) and (max-width: ${media[index] - 1}px)`
}

const mediaStores = new Map<string, _MediaStore>()

/**
 * The store for a set of breakpoints, shared by every component that uses it (every `Layer` and
 * `Popover` does). Stores are keyed by content, so two arrays with the same breakpoints share one
 * store even when they are different instances. Each store subscribes once to the shared query
 * stores and fans the changes out to its subscribers; it is evicted when the last subscriber
 * leaves, so dynamically generated breakpoint arrays do not accumulate, and on the server
 * nothing is cached at all.
 *
 * @internal
 */
export function _getMediaStore(media: number[]): _MediaStore {
  if (typeof window === 'undefined') return _createMediaStore(media)

  const key = media.join(',')
  let store = mediaStores.get(key)

  if (!store) {
    store = _createMediaStore(media, key)
    mediaStores.set(key, store)
  }

  return store
}

function _createMediaStore(media: number[], key?: string): _MediaStore {
  // Highest breakpoint first: the first query that matches wins in `getSnapshot`
  const queries: {index: number; query: MediaQuery}[] = []

  for (let index = media.length; index > -1; index -= 1) {
    queries.push({index, query: _getMediaQuery(media, index)})
  }

  const subscribers = new Set<() => void>()
  // The query stores this store is subscribed to, while it has subscribers. `getSnapshot` reads
  // from those same stores, so the index and its notifications always come from the same lists
  // (see `_createMediaQueryStore`).
  let listening: {stores: _MediaQueryStore[]; unlisten: () => void} | undefined

  // Reaches `window.matchMedia` through the query stores, so it is only called from
  // `getSnapshot` and `subscribe`, which React never calls on the server (where
  // `getServerSnapshot` is used)
  const queryStore = (position: number) =>
    listening?.stores[position] ?? _getMediaQueryStore(queries[position].query)

  const getSnapshot = () => {
    for (let position = 0; position < queries.length; position += 1) {
      if (queryStore(position).getSnapshot()) return queries[position].index
    }

    return 0
  }

  const listen = () => {
    const notify = () => {
      for (const subscriber of subscribers) {
        subscriber()
      }
    }
    const stores = queries.map((_, position) => queryStore(position))
    const disposeFns = stores.map((target) =>
      target.subscribe(() => {
        // Crossing a breakpoint fires two queries, the one that stops matching and the one that
        // starts matching; only the latter changes the index
        if (target.getSnapshot()) notify()
      }),
    )

    return {
      stores,
      unlisten: () => {
        for (const disposeFn of disposeFns) {
          disposeFn()
        }
      },
    }
  }

  const store: _MediaStore = {
    getSnapshot,
    subscribe(onStoreChange) {
      if (!listening) listening = listen()
      subscribers.add(onStoreChange)

      return () => {
        subscribers.delete(onStoreChange)

        if (subscribers.size > 0) return

        listening?.unlisten()
        listening = undefined

        // Evict, unless a newer store has already taken this key over (see `_getMediaQueryStore`)
        if (key !== undefined && mediaStores.get(key) === store) mediaStores.delete(key)
      }
    },
  }

  return store
}

/**
 * Only called during server-side rendering, and hydration if using hydrateRoot
 * Since the server environment doesn't have access to the DOM, we can't determine the current value of the media query
 * and we assume the smallest breakpoint
 *
 * @link https://beta.reactjs.org/apis/react/useSyncExternalStore#adding-support-for-server-rendering
 */
function getServerSnapshot() {
  return 0
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useMediaIndex(): number {
  const {media} = useTheme_v2()
  const store = useMemo(() => _getMediaStore(media), [media])

  return useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot)
}
