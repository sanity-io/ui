import {useMemo} from 'react'
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
  return useMemo(() => _getArrayProp(val, defaultVal), [defaultVal, val])
}
