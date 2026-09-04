import {type RefCallback, useCallback, useRef} from 'react'

/**
 * Creates a callback ref that preserves connected elements across React's
 * temporary Suspense and Activity detach cycles.
 *
 * React calls refs with `null` when hiding a subtree even though its DOM nodes
 * remain connected. Forwarding that transient `null` to a state setter can
 * cause a hide/reveal update loop. Real removals are forwarded after the
 * commit, when the detached node is no longer connected.
 *
 * @internal
 */
export function useConnectedRef<T extends Node>(
  onChange: (node: T | null) => void,
): RefCallback<T> {
  const currentNodeRef = useRef<T | null>(null)
  const currentOnChangeRef = useRef(onChange)
  const detachVersionRef = useRef(0)

  return useCallback(
    (node: T | null) => {
      const detachVersion = ++detachVersionRef.current

      if (node) {
        const changed = currentNodeRef.current !== node || currentOnChangeRef.current !== onChange

        currentNodeRef.current = node
        currentOnChangeRef.current = onChange

        if (changed) onChange(node)
        return
      }

      const detachedNode = currentNodeRef.current
      if (!detachedNode) return

      queueMicrotask(() => {
        if (
          detachVersionRef.current !== detachVersion ||
          currentNodeRef.current !== detachedNode ||
          detachedNode.isConnected
        ) {
          return
        }

        currentNodeRef.current = null
        currentOnChangeRef.current = onChange
        onChange(null)
      })
    },
    [onChange],
  )
}
