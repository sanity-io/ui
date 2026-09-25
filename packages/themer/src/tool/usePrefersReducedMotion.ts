import {useSyncExternalStore} from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const media = matchMedia(QUERY)

  media.addEventListener('change', onChange)

  return () => media.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Whether the user prefers reduced motion — live, so that turning the
 * setting on while the Studio is open takes effect right away.
 *
 * @internal
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
