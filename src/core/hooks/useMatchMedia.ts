import {useDebugValue, useMemo, useSyncExternalStore} from 'react'

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
  const {subscribe, getSnapshot} = useMemo(() => {
    /**
     * `subscribe` and `getSnapshot` are only called on the client and both need access to the same `matchMedia` instance
     * we don't want to eagerly instantiate it to ensure it's only created when actually used
     */
    let MEDIA_QUERY_CACHE: MediaQueryList | undefined

    const getMatchMedia = (): MediaQueryList => {
      if (!MEDIA_QUERY_CACHE) {
        // As this function is only called during `subscribe` and `getSnapshot`, we can assume that the
        // the `window` global is available and we're in a browser environment
        MEDIA_QUERY_CACHE = window.matchMedia(mediaQueryString)
      }

      return MEDIA_QUERY_CACHE
    }

    return {
      subscribe: (onStoreChange: () => void): (() => void) => {
        const matchMedia = getMatchMedia()

        matchMedia.addEventListener('change', onStoreChange)

        return () => matchMedia.removeEventListener('change', onStoreChange)
      },
      getSnapshot: () => getMatchMedia().matches,
    }
  }, [mediaQueryString])

  useDebugValue(mediaQueryString)

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
