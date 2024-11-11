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
  /**
   * `subscribe` and `getSnapshot` are only called on the client and both need access to the same `matchMedia` instance
   * we don't want to eagerly instantiate it to ensure it's only created when actually used
   */
  const cachedMatchMedia = useMemo(
    () => (typeof window === 'undefined' ? null : window.matchMedia(mediaQueryString)),
    [mediaQueryString],
  )
  const {subscribe, getSnapshot} = useMemo(() => {
    return {
      subscribe: (onStoreChange: () => void): (() => void) => {
        cachedMatchMedia!.addEventListener('change', onStoreChange)

        return () => cachedMatchMedia!.removeEventListener('change', onStoreChange)
      },
      getSnapshot: () => cachedMatchMedia!.matches,
    }
  }, [cachedMatchMedia])

  useDebugValue(mediaQueryString)

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
