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
): T[] {
  const [[cachedVal, cachedHash], setCache] = useState<[T[], string]>(() => [
    _getArrayProp(val),
    JSON.stringify(val),
  ])
  let result = cachedVal

  const hash = JSON.stringify(val)

  if (hash !== cachedHash) {
    const current = _getArrayProp(val)
    // If the cached hash has changed, update the cache right away.
    // Calling setState during render is fine in this case, and preferred over a useEffect loop
    // https://19.react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    setCache([current, hash])
    result = current
  }

  return result
}
