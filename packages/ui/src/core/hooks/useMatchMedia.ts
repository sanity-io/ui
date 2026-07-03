import {useCallback, useDebugValue, useSyncExternalStore} from 'react'

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

  return useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        const media = window.matchMedia(mediaQueryString)
        media.addEventListener('change', onStoreChange)
        return () => media.removeEventListener('change', onStoreChange)
      },
      [mediaQueryString],
    ),
    () => window.matchMedia(mediaQueryString).matches,
    getServerSnapshot,
  )
}
