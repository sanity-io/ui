import {useMemo} from 'react'
import {_getArrayProp} from '../styles'

/** @beta */
export type ArrayPropPrimitive = string | number | boolean | undefined | null

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 * @deprecated use `_getArrayProp` and `useMemo` directly instead
 * @example
 * ```diff
 * -import {useArrayProp} from '@sanity/ui'
 * +import {_getArrayProp} from '@sanity/ui'
 * +import {useMemo} from 'react'
 *
 * -const width = useArrayProp(props.width)
 * +const width = useMemo(() => _getArrayProp(props.width), [props.width])
 * ```
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal?: T[],
): T[] {
  return useMemo(() => _getArrayProp(val, defaultVal), [defaultVal, val])
}
