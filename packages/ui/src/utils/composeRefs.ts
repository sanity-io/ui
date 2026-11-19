/**
 * Based on `@radix-ui/react-compose-refs` by WorkOS (MIT License):
 * https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 *
 * Changes from the original:
 * - React 19+ only. The composed callback ref always returns a cleanup function, so React never
 *   calls it with `null` on detach.
 * - No `useComposedRefs` hook. The React Compiler memoizes `composeRefs(...)` calls in components,
 *   so the composed ref stays the same between renders while its refs stay the same.
 */
import {type Ref, type RefCallback} from 'react'

type PossibleRef<T> = Ref<T> | undefined

/**
 * Sets a ref to a value. Returns the cleanup function of a callback ref, if it returns one.
 */
function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    return ref(value)
  }

  if (ref !== null && ref !== undefined) {
    ref.current = value
  }

  return undefined
}

/**
 * Composes multiple refs (callback refs and ref objects) into one callback ref.
 *
 * On detach, the composed ref calls the cleanup function of each callback ref that returned one.
 * It sets all other refs to `null`.
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (node) => {
    const cleanups = refs.map((ref) => setRef(ref, node))

    return () => {
      for (let i = 0; i < refs.length; i++) {
        const cleanup = cleanups[i]

        if (typeof cleanup === 'function') {
          cleanup()
        } else {
          setRef(refs[i], null)
        }
      }
    }
  }
}
