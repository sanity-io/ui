import {useMemo, useRef} from 'react'

/**
 * Shallow equality check for objects and arrays
 * @internal
 */
function shallowEqual<T>(a: T, b: T): boolean {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object') return false
  if (a === null || b === null) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => item === b[index])
  }

  const keysA = Object.keys(a as object)
  const keysB = Object.keys(b as object)

  if (keysA.length !== keysB.length) return false

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key],
  )
}

/**
 * Hook that returns a stable reference when the value is shallowly equal
 * Prevents unnecessary re-renders and re-registrations
 *
 * @deprecated prefer `useMemo` in the wrapping component instead
 *
 * @internal
 * @param value - The value to stabilize
 * @returns Stable reference to the value
 */
export function useUnique<T>(value: T): T {
  const ref = useRef<T>(value)

  // Use useMemo to compute the stable value
  // Intentionally accessing and updating ref for memoization
  return useMemo(() => {
    // eslint-disable-next-line react-hooks/refs
    if (shallowEqual(ref.current, value)) {
      // eslint-disable-next-line react-hooks/refs
      return ref.current
    }
    // eslint-disable-next-line react-hooks/refs
    ref.current = value
    return value
  }, [value])
}
