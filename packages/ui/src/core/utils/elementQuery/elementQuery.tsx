import {useImperativeHandle, useLayoutEffect, useRef} from 'react'

import {useTheme_v2} from '../../theme/useTheme'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface MediaQueryProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  media?: number[]
}

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export function ElementQuery(
  props: MediaQueryProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'media'>,
) {
  const theme = useTheme_v2()
  const {children, media: _media, ref: forwardedRef, ...restProps} = props
  const media = _media ?? theme.media

  const ref = useRef<HTMLDivElement | null>(null)

  // The `data-eq-min` / `data-eq-max` attributes only exist for CSS attribute selectors, so the
  // observer callback writes them onto the element directly: nothing is measured or derived during
  // render, and a resize re-renders nothing. Observing from a layout effect makes the browser
  // deliver the initial entry in the same frame as the commit — after layout, before the first
  // paint — so the attributes describe the element's own width from the start, with no viewport
  // fallback. An element without a box (`display: none`) is either reported as 0 wide (Chromium)
  // or not at all (per specification); nothing is painted in either case, and the frame that
  // shows it delivers its real width before painting. Re-observing when `media` changes delivers
  // a fresh entry, which applies the new breakpoints without waiting for a resize.
  useLayoutEffect(() => {
    const element = ref.current

    if (!element) return undefined

    const observer = new ResizeObserver(([entry]) => {
      setBreakpointAttributes(element, media, entry.borderBoxSize[0].inlineSize)
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [media])

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    forwardedRef,
    () => ref.current,
    [],
  )

  return (
    // `data-eq-min` / `data-eq-max` belong to the observer: set to `undefined` after the spread,
    // React never writes or removes them, whatever a caller passes
    <div
      data-ui="ElementQuery"
      {...restProps}
      data-eq-max={undefined}
      data-eq-min={undefined}
      ref={ref}
    >
      {children}
    </div>
  )
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
