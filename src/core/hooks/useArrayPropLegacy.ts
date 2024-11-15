import {useArrayProp as useArrayPropHook, type ArrayPropPrimitive} from './useArrayProp'

export type {ArrayPropPrimitive}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
): T[]
/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 * @deprecated - use `useArrayProp(value ?? defaultValue)` instead of `useArrayProp(value, defaultValue)`
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal: T[],
): T[]
/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function useArrayProp<T extends ArrayPropPrimitive = ArrayPropPrimitive>(
  val: T | T[] | undefined,
  defaultVal?: T[],
): T[] {
  return useArrayPropHook(val ?? defaultVal)
}
