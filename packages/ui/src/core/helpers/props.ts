import {BREAKPOINT_KEYS, type ResponsiveProp, type ResponsivePropArray} from '@sanity/ui/css'

import {EMPTY_ARRAY} from '../constants'
import {isArray} from '../lib/isArray'
import {isRecord} from '../lib/isRecord'

// WeakMap for object/array values (automatic GC when objects are no longer referenced)
const objectCache = new WeakMap<object, ResponsivePropArray<unknown>>()

// Map for primitive values (bounded growth - only primitives like numbers/strings)
const primitiveCache = new Map<unknown, ResponsivePropArray<unknown>>()

/**
 * @internal
 */
export function _getResponsiveProp<T>(
  val: ResponsiveProp<T> | undefined,
  defaultVal?: ResponsivePropArray<T>,
): ResponsivePropArray<T> {
  // Fast path: undefined
  if (val === undefined) {
    return defaultVal || (EMPTY_ARRAY as unknown as ResponsivePropArray<T>)
  }

  // Fast path: already an array or object - use WeakMap for identity-based caching
  if (isArray(val)) {
    let v = val

    // convert to array
    if (isRecord(val)) {
      v = BREAKPOINT_KEYS.map((key) => val[key]) as ResponsivePropArray<T>
    }

    const cached = objectCache.get(v)
    if (cached) return cached as ResponsivePropArray<T>

    const ret = v as ResponsivePropArray<T>
    objectCache.set(v, ret)
    return ret
  }

  // Primitive value - wrap in array and cache by value
  const cached = primitiveCache.get(val)
  if (cached) return cached as ResponsivePropArray<T>

  const ret = [val] as ResponsivePropArray<T>

  primitiveCache.set(val, ret)

  return ret
}
