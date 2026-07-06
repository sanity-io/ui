import {useMatchMedia} from './useMatchMedia'

/**
 * Returns true if a dark color scheme is preferred, false if a light color scheme is preferred or the preference is not known.
 *
 * @param getServerSnapshot - Only called during server-side rendering, and hydration if using hydrateRoot. Since the server environment doesn't have access to the DOM, we can't determine the current value of the media query and we assume `(prefers-color-scheme: light)` since it's the most common scheme (https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
 *
 * If you persist the detected preference in a cookie or a header then you may implement your own server snapshot to read it.
 * Chrome supports reading the `prefers-color-scheme` media query from a header if the server response: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme
 * @example https://gist.github.com/stipsan/13c0cccf8dfc34f4b44bb1b984baf7df
 *
 * @public
 */
export function usePrefersDark(getServerSnapshot = () => false): boolean {
  return useMatchMedia('(prefers-color-scheme: dark)', getServerSnapshot)
}
