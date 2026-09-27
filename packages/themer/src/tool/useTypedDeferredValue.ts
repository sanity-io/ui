import {addTransitionType, startTransition, useDeferredValue, useEffect, useState} from 'react'

/**
 * `useDeferredValue` with a transition type: the returned value lags behind
 * `value` like a deferred one — rendered in a transition, which React
 * animates — and the view transition React starts for it carries the given
 * type (`document.startViewTransition({types})`), so a stylesheet tells it
 * from any other transition on the page through
 * `:active-view-transition-type()`.
 *
 * React only takes types from `startTransition`, and a deferred render is
 * not one. So while the deferred value lags, a transition of the type joins
 * it, with a state update of its own for the type to belong to: React renders
 * every pending transition in one go, and the commit — the view transition
 * — carries the types of all of them. The value itself stays with
 * `useDeferredValue`, which reads the latest `value` as the deferred render
 * runs: should `value` change back before that render commits, nothing
 * changes and nothing animates — a queued state update would commit the
 * stale value and animate it, only to animate back.
 *
 * The transition starts from an effect, not from the render that sees the
 * value lag. A state update made during that render is a render phase one:
 * React replays the component within the render it is already doing rather
 * than scheduling a transition, so there is no transition for the type to
 * belong to and the deferred render commits untyped — and the replay sees
 * the value lag just the same, so it repeats until React gives up on it.
 * Typing the deferred render from inside itself does reach the right
 * commit, but a type added during a render is queued on the root, and a
 * deferred render whose value changed back commits nothing to claim it: the
 * type waits there for somebody else's transition to wear.
 *
 * @internal
 */
export function useTypedDeferredValue<T>(value: T, type: string): T {
  const deferred = useDeferredValue(value)
  const [, setTransitions] = useState(0)

  useEffect(() => {
    if (Object.is(deferred, value)) return

    startTransition(() => {
      addTransitionType(type)
      setTransitions((count) => count + 1)
    })
  }, [deferred, type, value])

  return deferred
}
