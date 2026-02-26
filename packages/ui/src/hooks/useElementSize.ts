import {_elementSizeObserver, type ElementSize} from '@sanity/ui/core'
import {useEffect, useState} from 'react'

/**
 * Subscribe to the size of a DOM element.
 * @beta
 */
export function useElementSize(element: HTMLElement | null): ElementSize | null {
  const [size, setSize] = useState<ElementSize | null>(null)

  useEffect(() => {
    if (!element) return undefined

    return _elementSizeObserver.subscribe(element, setSize)
  }, [element])

  return size
}
