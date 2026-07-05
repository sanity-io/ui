import {useImperativeHandle, useRef} from 'react'

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
// oxlint-disable-next-line no-deprecated
export function useForwardedRef<T>(ref: React.ForwardedRef<T>): React.MutableRefObject<T | null> {
  const innerRef = useRef<T | null>(null)

  useImperativeHandle(ref, () => innerRef.current!)

  return innerRef
}
