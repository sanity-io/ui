import {useInsertionEffect, useRef} from 'react'

/**
 * Drop-in replacement for React's native `useEffectEvent`.
 *
 * React 19.2's `useEffectEvent` never sees values past the first render when
 * the component (or the component calling the hook) is wrapped in
 * `forwardRef` or `memo`: the commit phase only applies effect-event updates
 * to plain function-component fibers. The fix
 * (https://github.com/facebook/react/pull/34831) has not shipped in a stable
 * release yet, and both `@sanity/ui` itself (e.g. `DialogCard`, `Tooltip`)
 * and its consumers rely on these hooks inside `forwardRef`/`memo`
 * components.
 *
 * TODO: replace with `useEffectEvent` from `react` once the fix from
 * https://github.com/facebook/react/issues/34818 is in the lowest React
 * version we support.
 *
 * @internal
 */
export function useEffectEvent<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  const ref = useRef(fn)

  useInsertionEffect(() => {
    ref.current = fn
  }, [fn])

  return (...args) => ref.current(...args)
}
