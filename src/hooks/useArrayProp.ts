import {useMemo} from 'react'
import {_getArrayProp} from '../styles'

export type Primitive = string | number | boolean | undefined | null

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useArrayProp<T extends Primitive = Primitive>(
  val: T | T[] | undefined,
  defaultVal?: T[]
): T[] {
  const __perf_hash__ = JSON.stringify(val ?? defaultVal)

  return useMemo(
    () => _getArrayProp(val, defaultVal),

    // Improve performance: Keep object identify for a given hash of the value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [__perf_hash__]
  )
}
