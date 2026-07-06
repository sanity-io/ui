import {useState} from 'react'

import {_getArrayProp} from '../styles'

/** @beta */
export type ArrayPropPrimitive = string | number | boolean | undefined | null

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal?: T[],
): T[] {
  const [[cachedVal, cachedHash], setCache] = useState<[T[], string]>(() => [
    _getArrayProp(val, defaultVal),
    JSON.stringify(val ?? defaultVal),
  ])

  const hash = JSON.stringify(val ?? defaultVal)

  if (hash !== cachedHash) {
    // If the cached hash has changed, update the cache right away.
    // Calling setState during render is fine in this case, and preferred over a useEffect loop
    // https://19.react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    setCache([_getArrayProp(val, defaultVal), hash])
  }

  return cachedVal
}
