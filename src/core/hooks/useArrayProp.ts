import {useMemo} from 'react'

import {_getArrayProp} from '../styles'

/** @beta */
export type ArrayPropPrimitive = string | number | boolean | undefined | null

/**
 * @deprecated instead of `useArrayProp(width)` use `Array.isArray(width) ? width : [width]` instead
 * @beta
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal?: T[],
): T[] {
  return useMemo(() => _getArrayProp(val, defaultVal), [val, defaultVal])
}
