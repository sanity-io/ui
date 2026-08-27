import {useDebugValue, useEffect, useInsertionEffect, useRef} from 'react'

import {EMPTY_ARRAY} from '../constants'

/**
 * @public
 */
export type ClickOutsideEventListener = (event: MouseEvent) => void

/**
 * @public
 */
export type ClickOutsideEventElements = (HTMLElement | null | (HTMLElement | null)[])[]

/**
 * @public
 */
export function useClickOutsideEvent(
  listener: ClickOutsideEventListener | false | undefined,
  elementsArg: () => ClickOutsideEventElements = () => EMPTY_ARRAY,
  boundaryElement?: () => HTMLElement | null,
): void {
  /**
   * The ref lets the `mousedown` listener see the latest value of `listener`, `elementsArg` and
   * `boundaryElement` without the listener constantly being added and removed — the
   * `useEffectEvent` pattern, inlined from
   * https://github.com/sanity-io/use-effect-event/blob/v1.0.2/src/useEffectEvent.ts
   *
   * TODO: switch to `useEffectEvent` from `react` once
   * https://github.com/facebook/react/issues/34818 is fixed in the lowest React
   * version we support: on React 19.2 the native hook never sees values past
   * the first render when the calling component is wrapped in `forwardRef` or
   * `memo`. This public hook runs in the fiber of whatever component calls it
   * (consumers may call it from `forwardRef` or `memo` components).
   */
  const onEvent = (evt: MouseEvent) => {
    if (!listener) {
      return
    }

    const target = evt.target

    if (!(target instanceof Node)) {
      return
    }

    const resolvedBoundaryElement = boundaryElement?.()

    if (resolvedBoundaryElement && !resolvedBoundaryElement.contains(target)) {
      return
    }

    const elements = elementsArg().flat()

    for (const el of elements) {
      if (!el) continue

      if (target === el || el.contains(target)) {
        return
      }
    }

    listener(evt)
  }
  const onEventRef = useRef(onEvent)
  useInsertionEffect(() => {
    onEventRef.current = onEvent
  })

  const hasListener = Boolean(listener)

  useEffect(() => {
    if (!hasListener) return undefined

    const handleEvent = (evt: MouseEvent) => onEventRef.current(evt)

    document.addEventListener('mousedown', handleEvent)

    return () => {
      document.removeEventListener('mousedown', handleEvent)
    }
  }, [hasListener])

  useDebugValue(listener ? 'MouseDown On' : 'MouseDown Off')
}
