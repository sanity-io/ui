import {useEffect, useState} from 'react'
import {useEffectEvent} from 'use-effect-event'
import {EMPTY_ARRAY} from '../constants'

/**
 * @public
 */
export type ClickOutsideListener = (event: MouseEvent) => void

/**
 * @public
 */
export type ClickOutsideElements = (HTMLElement | null | (HTMLElement | null)[])[]

/**
 * @public
 * @deprecated - use your own `const [element, setElement] = useState(null)` logic instead
 */
export type UseClickOutsideSetElement = (el: HTMLElement | null) => void

/**
 * @public
 */
export function useClickOutside(
  listener: ClickOutsideListener | false | undefined,
  elementsArg: () => ClickOutsideElements,
  boundaryElement?: () => HTMLElement | null,
): void
/**
 * @public
 * @deprecated - change `useClickOutside(handler, () => [...], boundary)` to `useClickOutside(handler, () => [...], () => boundary)`
 */
export function useClickOutside(
  listener: ClickOutsideListener | false | undefined,
  elementsArg: () => ClickOutsideElements,
  boundaryElement: HTMLElement | null,
): void
/**
 * @public
 * @deprecated - change `useClickOutside(handler, [...], () => boundary)` to `useClickOutside(handler, () => [...], () => boundary)`
 */
export function useClickOutside(
  listener: ClickOutsideListener | false | undefined,
  elementsArg: ClickOutsideElements,
  boundaryElement: () => HTMLElement | null,
): UseClickOutsideSetElement
/**
 * @public
 * @deprecated
 * Instead of:
 * ```tsx
 * const buttonRef = useRef(null)
 * const setElement = useClickOutside(() => {}, [buttonRef.current])
 * return (
 *   <>
 *     <button ref={buttonRef} />
 *     {open && <div ref={setElement} />}
 *   </>
 * )
 * ```
 * Use:
 * ```tsx
 * const buttonRef = useRef()
 * const [element, setElement] = useState(null)
 * useClickOutside(() => {}, () => [buttonRef.current, element])
 * return (
 *   <>
 *     <button ref={buttonRef} />
 *     {open && <div ref={setElement} />}
 *   </>
 * )
 * ```
 */
export function useClickOutside(
  listener: ClickOutsideListener | false | undefined,
  elementsArg: ClickOutsideElements,
  boundaryElement?: HTMLElement | null,
): UseClickOutsideSetElement

/**
 * @public
 */
export function useClickOutside(
  listener: ClickOutsideListener | false | undefined,
  elementsArg: ClickOutsideElements | (() => ClickOutsideElements) = EMPTY_ARRAY,
  boundaryElement?: HTMLElement | null | (() => HTMLElement | null),
): UseClickOutsideSetElement | void {
  /** @deprecated */
  const [legacyElement, setLegacyElement] = useState<HTMLElement | null>(null)

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

    const resolvedBoundaryElement =
      typeof boundaryElement === 'function' ? boundaryElement() : boundaryElement

    if (resolvedBoundaryElement && !resolvedBoundaryElement.contains(target)) {
      return
    }

    const resolvedElements = Array.isArray(elementsArg)
      ? [legacyElement, ...elementsArg]
      : elementsArg()
    const elements = resolvedElements.flat()

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
  }, [hasListener, onEvent])

  /**
   * Only return the legacy setElement function if the elementsArg is an array
   */
  if (Array.isArray(elementsArg)) {
    return setLegacyElement as UseClickOutsideSetElement
  }
}
