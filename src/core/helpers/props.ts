import {EMPTY_ARRAY} from '../constants'

/**
 * @internal
 */
export function _getArrayProp<T>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  if (val === undefined) return defaultVal || EMPTY_ARRAY

  return Array.isArray(val) ? val : [val]
}
