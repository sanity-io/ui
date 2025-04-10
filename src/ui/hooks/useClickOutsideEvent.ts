import {useDebugValue, useEffect} from 'react'
import {useEffectEvent} from 'use-effect-event'

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
   * The `useEffectEvent` hook allow us to always see the latest value of `listener`, `elementsArg` and `boundaryElement` without needing to
   * juggle `useState`, `useRef` and `useState` to make sure the `mousedown` event listener isn't constantly being added and removed.
   */
  const onEvent = useEffectEvent((evt: MouseEvent) => {
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
  })

  const hasListener = Boolean(listener)

  useEffect(() => {
    if (!hasListener) return undefined

    const handleEvent = (evt: MouseEvent) => onEvent(evt)

    document.addEventListener('mousedown', handleEvent)

    return () => {
      document.removeEventListener('mousedown', handleEvent)
    }
  }, [hasListener])

  useDebugValue(listener ? 'MouseDown On' : 'MouseDown Off')
}
