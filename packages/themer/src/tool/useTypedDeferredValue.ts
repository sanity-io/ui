import {addTransitionType, startTransition, useEffect, useState} from 'react'

/**
 * `useDeferredValue` with a transition type: the returned value lags behind
 * `value` by a transition — a render React animates, like a deferred one —
 * that carries the given type, and so does the view transition React starts
 * for it (`document.startViewTransition({types})`): a stylesheet tells it
 * from any other transition on the page through
 * `:active-view-transition-type()`. React only takes types from
 * `startTransition`, which is why this is not `useDeferredValue` itself.
 *
 * @internal
 */
export function useTypedDeferredValue<T>(value: T, type: string): T {
  const [deferred, setDeferred] = useState(value)

  useEffect(() => {
    if (Object.is(deferred, value)) return

    startTransition(() => {
      addTransitionType(type)
      setDeferred(value)
    })
  }, [deferred, type, value])

  return deferred
}
