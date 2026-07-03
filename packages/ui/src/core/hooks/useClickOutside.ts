import {useEffect, useRef, useState} from 'react'

import {EMPTY_ARRAY} from '../constants'

/**
 * @public
 */
export type ClickOutsideListener = (event: MouseEvent) => void

/**
 * @public
 */
export type ClickOutsideElements = (HTMLElement | null | (HTMLElement | null)[])[]

function _getElements(
  element: HTMLElement | null,
  elementsArg: ClickOutsideElements,
): HTMLElement[] {
  const ret = [element]

  for (const el of elementsArg) {
    if (Array.isArray(el)) {
      ret.push(...el)
    } else {
      ret.push(el)
    }
  }

  return ret.filter(Boolean) as HTMLElement[]
}

/**
 * @public
 * @deprecated replaced by the new `useClickOutsideEvent` hook, instead of:
 * ```tsx
 * const [button, setButtonElement] = useState(null)
 * useClickOutside((event) => {}, [button])
 * return <button ref={setButtonElement} />
 * ```
 * do:
 * ```tsx
 * const buttonRef = useRef()
 * useClickOutsideEvent((event) => {}, () => [buttonRef.current])
 * return <button ref={buttonRef} />
 * ```
 */
export function useClickOutside(
  listener: ClickOutsideListener,
  elementsArg: ClickOutsideElements = EMPTY_ARRAY,
  boundaryElement?: HTMLElement | null,
): (el: HTMLElement | null) => void {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [elements, setElements] = useState(() => _getElements(element, elementsArg))
  const elementsRef = useRef(elements)

  useEffect(() => {
    const prevElements = elementsRef.current
    const nextElements = _getElements(element, elementsArg)

    if (prevElements.length !== nextElements.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setElements(nextElements)
      elementsRef.current = nextElements

      return
    }

    for (const el of prevElements) {
      if (!nextElements.includes(el)) {
        setElements(nextElements)
        elementsRef.current = nextElements

        return
      }
    }

    for (const el of nextElements) {
      if (!prevElements.includes(el)) {
        setElements(nextElements)
        elementsRef.current = nextElements

        return
      }
    }
  }, [element, elementsArg])

  useEffect(() => {
    if (!listener) return undefined

    const handleWindowMouseDown = (evt: MouseEvent) => {
      const target = evt.target

      if (!(target instanceof Node)) {
        return
      }

      if (boundaryElement && !boundaryElement.contains(target)) {
        return
      }

      for (const el of elements) {
        if (target === el || el.contains(target)) {
          return
        }
      }

      listener(evt)
    }

    window.addEventListener('mousedown', handleWindowMouseDown)

    return () => {
      window.removeEventListener('mousedown', handleWindowMouseDown)
    }
  }, [boundaryElement, listener, elements])

  return setElement
}
