import {useEffect, useState} from 'react'

type ClickOutsideListener = (event: Event) => void

export function useClickOutside(
  listener: ClickOutsideListener,
  elementsArg: Array<HTMLElement | null> = [],
  boundaryElement?: HTMLElement | null
) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const elements = [element, ...elementsArg]

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
        if (el && el.contains(target as Node)) {
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
  }, [boundaryElement, listener, ...elements])

  return setElement
}
