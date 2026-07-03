import {useMatchMedia} from './useMatchMedia'

/**
 * Returns true if motion should be reduced
 *
 * @param getServerSnapshot - Only called during server-side rendering, and hydration if using hydrateRoot. Since the server environment doesn't have access to the DOM, we can't determine the current value of the media query and we assume `(prefers-reduced-motion: no-preference)` since it's the most common scheme (https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
 *
 * If you persist the detected preference in a cookie or a header then you may implement your own server snapshot to read it.
 * Chrome supports reading the `prefers-reduced-motion` media query from a header if the server response: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Reduced-Motion
 * @example https://gist.github.com/stipsan/0c0f839a27842249cada893e9fb7767b
 *
 * @public
 */
export function usePrefersReducedMotion(getServerSnapshot = () => false): boolean {
  return useMatchMedia('(prefers-reduced-motion: reduce)', getServerSnapshot)
}
