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
export function useForwardedRef(_ref?: never): never {
  throw new Error(
    '`useForwardedRef` was removed in @sanity/ui v4. Use `useRef` and `useImperativeHandle` instead.',
  )
}
