import {BREAKPOINTS} from '@sanity/ui/css'
import {useImperativeHandle, useMemo, useState} from 'react'

import {useElementSize} from '../../hooks/useElementSize'
import type {ComponentType, Props} from '../../types'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/** @beta */
export const DEFAULT_ELEMENT_QUERY_ELEMENT = 'div'

/**
 * Own props for the {@link ElementQuery} component.
 *
 * @remarks
 * Defines the configuration for a container-query-style component that
 * applies `data-eq-min` and `data-eq-max` attributes based on the
 * element's measured width and a set of breakpoint thresholds.
 *
 * @beta
 */
export type ElementQueryOwnProps = {
  /**
   * Custom breakpoint thresholds (in pixels) used to compute the
   * `data-eq-min` and `data-eq-max` attributes on the rendered element.
   *
   * @remarks
   * Each value represents a pixel width boundary. As the element resizes,
   * the component determines which breakpoints the current width exceeds
   * (`min`) or falls below (`max`) and sets corresponding data attributes
   * that can be targeted with CSS attribute selectors.
   *
   * When omitted, the default breakpoints from the design system's
   * `BREAKPOINTS` constant are used.
   */
  media?: number[]
}

/** @beta */
export type ElementQueryElementType = 'div' | ComponentType

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export type ElementQueryProps<E extends ElementQueryElementType = ElementQueryElementType> = Props<
  ElementQueryOwnProps,
  E
>

const DEFAULT_BREAKPOINTS = Object.values(BREAKPOINTS)

/**
 * A container-query component that measures its own width and applies
 * responsive `data-eq-min` and `data-eq-max` attributes to the rendered element.
 *
 * @remarks
 * The `ElementQuery` component observes the border-box width of its rendered
 * element via {@link useElementSize} and compares it against a set of
 * breakpoint thresholds (either the default design-system breakpoints or a
 * custom list provided via the `media` prop). It then sets `data-eq-min` and
 * `data-eq-max` attributes whose values are space-separated breakpoint
 * indices, enabling CSS-based responsive styling scoped to the element's own
 * width rather than the viewport.
 *
 * @beta
 */
export function ElementQuery<
  E extends ElementQueryElementType = typeof DEFAULT_ELEMENT_QUERY_ELEMENT,
>(props: ElementQueryProps<E>): React.JSX.Element {
  const {
    as: Element = DEFAULT_ELEMENT_QUERY_ELEMENT,
    children,
    media: mediaProp,
    ref: forwardedRef,
    ...rest
  } = props as ElementQueryProps<typeof DEFAULT_ELEMENT_QUERY_ELEMENT>

  const breakpoints = mediaProp ?? DEFAULT_BREAKPOINTS

  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const elementSize = useElementSize(element)
  const width = useMemo(() => elementSize?.border.width ?? window.innerWidth, [elementSize])

  const max = useMemo(() => {
    const eq = findMaxBreakpoints(breakpoints, width)

    return eq.length ? eq.join(' ') : undefined
  }, [breakpoints, width])

  const min = useMemo(() => {
    const eq = findMinBreakpoints(breakpoints, width)

    return eq.length ? eq.join(' ') : undefined
  }, [breakpoints, width])

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => element, [
    element,
  ])

  return (
    <Element data-ui="ElementQuery" {...rest} data-eq-max={max} data-eq-min={min} ref={setElement}>
      {children}
    </Element>
  )
}
