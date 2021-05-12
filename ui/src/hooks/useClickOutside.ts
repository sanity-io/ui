import {useEffect, useRef, useState} from 'react'
import {EMPTY_ARRAY} from '../constants'

type ClickOutsideListener = (event: MouseEvent) => void

function _getElements(
  element: HTMLElement | null,
  elementsArg: Array<HTMLElement | HTMLElement[] | null>
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

export function useClickOutside(
  listener: ClickOutsideListener,
  elementsArg: Array<HTMLElement | HTMLElement[] | null> = EMPTY_ARRAY,
  boundaryElement?: HTMLElement | null
) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [elements, setElements] = useState(() => {
    return _getElements(element, elementsArg)
  })
  const elementsRef = useRef(elements)

  useEffect(() => {
    const prevElements = elementsRef.current
    const nextElements = _getElements(element, elementsArg)

    if (prevElements.length !== nextElements.length) {
      return
    }

    for (const el of prevElements) {
      if (!nextElements.includes(el)) {
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

      if (!target) {
        return
      }

      if (boundaryElement && !boundaryElement.contains(target as Node)) {
        return
      }

      let clickInside = false

      for (const el of elements) {
        if (el.contains(target as Node)) {
          clickInside = true
        }
      }

      if (!clickInside) {
        listener(evt)
      }
    }

    window.addEventListener('mousedown', handleWindowMouseDown)

    return () => {
      window.removeEventListener('mousedown', handleWindowMouseDown)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundaryElement, listener, elements])

  return setElement
}
