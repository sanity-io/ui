import {useImperativeHandle, useLayoutEffect, useRef} from 'react'

import {useTheme_v2} from '../../theme/useTheme'
import {type BreakpointObserver, createBreakpointObserver} from './breakpointObserver'

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
  const observerRef = useRef<BreakpointObserver | null>(null)

  // The `data-eq-min` / `data-eq-max` attributes only exist for CSS attribute selectors, so the
  // observer writes them onto the element directly: nothing is measured or derived during render,
  // and a resize re-renders nothing. Observing from a layout effect makes the browser deliver the
  // initial entry in the same frame as the commit — after layout, before the first paint — so the
  // attributes describe the element's own width from the start, with no viewport fallback. An
  // element without a box (`display: none`) is either reported as 0 wide (Chromium) or not at all
  // (per specification); nothing is painted in either case, and the frame that shows it delivers
  // its real width before painting.
  //
  // No dependency array: `ref.current` is not reactive, so the effect runs after every commit to
  // notice a new element behind the ref (or a new `media` list) and re-observes only then. An
  // unchanged element and list cost one comparison per commit. Re-observing delivers a fresh
  // initial entry, which applies new breakpoints without waiting for a resize.
  useLayoutEffect(() => {
    if (!observerRef.current) observerRef.current = createBreakpointObserver()

    observerRef.current.observe(ref.current, media)
  })

  // Release the element when the effects are torn down (unmount, a hidden `Activity`); the effect
  // above observes it again when they run again
  useLayoutEffect(
    () => () => {
      observerRef.current?.disconnect()
    },
    [],
  )

  // No dependency array either, so a forwarded ref follows the element behind `ref`
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

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
