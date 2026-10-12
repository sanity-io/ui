import {useInsertionEffect, useRef} from 'react'

/**
 * A ref that always holds the latest `value`, updated before any layout effect of the same commit
 * runs (the same mechanism `use-effect-event` uses), for callbacks that run outside render.
 *
 * @internal
 */
export function useLatestRef<T>(value: T): React.RefObject<T> {
  const ref = useRef(value)

  useInsertionEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
