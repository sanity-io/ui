import {useDebugValue, useSyncExternalStore} from 'react'

import {_getMediaQueryStore} from '../observers/mediaQueryObserver'

/**
 * Efficiently subscribes to `window.matchMedia` queries
 *
 * @param getServerSnapshot - Only called during server-side rendering, and hydration if using hydrateRoot. Required if the hook is called during SSR (https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
 *
 * @public
 */
export function useMatchMedia(
  mediaQueryString: `(${string})`,
  getServerSnapshot?: () => boolean,
): boolean {
  useDebugValue(mediaQueryString)

  // One store (and one `MediaQueryList`) per query string, shared by every component that asks
  // for it, so neither rendering nor subscribing calls `window.matchMedia` again
  const store = _getMediaQueryStore(mediaQueryString)

  return useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot)
}
