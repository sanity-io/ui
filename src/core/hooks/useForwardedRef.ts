import {type ForwardedRef, type MutableRefObject, useImperativeHandle, useRef} from 'react'

/**
 * @beta
 * @deprecated use `useImperativeHandle` instead
 * @example
 * ```diff
 * -const ref = useForwardedRef(forwardedRef)
 * +const ref = useRef(null)
 * +useImperativeHandle(forwardedRef, () => ref.current)
 * ```
 */
export function useForwardedRef<T>(ref: ForwardedRef<T>): MutableRefObject<T | null> {
  const innerRef = useRef<T | null>(null)

  useImperativeHandle(ref, () => innerRef.current!)

  return innerRef
}
