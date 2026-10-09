/**
 * Attaches `value` to `ref` the way React attaches the `ref` prop of an element, and returns the
 * function that detaches it again: the cleanup the callback ref returned, if it returned one, and
 * otherwise a call with `null` (`current = null` for a ref object). For composing a ref of our own
 * with the one the consumer put on the element we clone.
 *
 * @internal
 */
export function attachRef<T>(ref: React.Ref<T> | undefined, value: T): () => void {
  if (!ref) return noop

  if (typeof ref === 'function') {
    const cleanup = ref(value)

    return typeof cleanup === 'function' ? cleanup : () => ref(null)
  }

  ref.current = value

  return () => {
    ref.current = null
  }
}

function noop() {}
