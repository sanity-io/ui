import type {Breakpoint, ResponsiveProp} from '@sanity/ui/css'
import {useState} from 'react'

import {_getResponsiveProp} from '../helpers/props'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useResponsiveProp<T>(
  val: ResponsiveProp<T> | undefined,
  defaultVal?: Partial<Record<Breakpoint, T>>,
): Partial<Record<Breakpoint, T>> {
  const [[cachedVal, cachedHash], setCache] = useState<[Partial<Record<Breakpoint, T>>, string]>(
    () => [_getResponsiveProp(val, defaultVal), JSON.stringify(val ?? defaultVal)],
  )

  const hash = JSON.stringify(val ?? defaultVal)

  if (hash !== cachedHash) {
    // If the cached hash has changed, update the cache right away.
    // Calling setState during render is fine in this case, and preferred over a useEffect loop
    // https://19.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    setCache([_getResponsiveProp(val, defaultVal), hash])
  }

  return cachedVal
}
