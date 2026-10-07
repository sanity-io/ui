import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * Keeps the `data-eq-min` / `data-eq-max` attributes of one element in sync with its width.
 * @internal
 */
export interface BreakpointObserver {
  /**
   * Observes `element` with the `media` breakpoints. A no-op while both are the ones last passed,
   * so calling it after every commit is cheap; otherwise the previously observed element is
   * released first. `null` only releases.
   */
  observe: (element: HTMLElement | null, media: number[]) => void
  /** Stops observing. The attributes written so far stay on the element. */
  disconnect: () => void
}

/**
 * @internal
 */
export function createBreakpointObserver(): BreakpointObserver {
  let observed: {element: HTMLElement; media: number[]; observer: ResizeObserver} | null = null

  function disconnect(): void {
    observed?.observer.disconnect()
    observed = null
  }

  return {
    observe(element, media) {
      if (observed && observed.element === element && observed.media === media) return

      disconnect()

      if (!element) return

      const observer = new ResizeObserver(([entry]) => {
        setBreakpointAttributes(element, media, entry.borderBoxSize[0].inlineSize)
      })

      observer.observe(element)
      observed = {element, media, observer}
    },
    disconnect,
  }
}

function setBreakpointAttributes(element: HTMLElement, media: number[], width: number): void {
  setBreakpointAttribute(element, 'data-eq-max', findMaxBreakpoints(media, width))
  setBreakpointAttribute(element, 'data-eq-min', findMinBreakpoints(media, width))
}

function setBreakpointAttribute(element: HTMLElement, name: string, indices: number[]): void {
  const value = indices.length ? indices.join(' ') : null

  // Skip writes that would not change anything, so a resize that stays within the same
  // breakpoints does not invalidate styles
  if (element.getAttribute(name) === value) return

  if (value === null) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, value)
  }
}
