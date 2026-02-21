import {useSyncExternalStore} from 'react'

/**
 * Some components should only render after mounting to the DOM, and not be rendered at all during SSR renderToString or equivalent.
 * @public
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

const subscribe = () => () => {}
