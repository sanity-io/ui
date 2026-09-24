import {useSyncExternalStore} from 'react'

/** @public */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}
