/**
 * Attaches `value` to `ref` the way React attaches an element's `ref` prop, and returns the
 * function that detaches it: the cleanup a callback ref returned, or else a call with `null`.
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
