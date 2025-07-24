import {BREAKPOINTS} from '@sanity/ui/css'
import {useImperativeHandle, useMemo, useState} from 'react'

import {useElementSize} from '../../hooks/useElementSize'
import type {ComponentType, Props} from '../../types'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/** @beta */
export const DEFAULT_ELEMENT_QUERY_ELEMENT = 'div'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export type ElementQueryOwnProps = {
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
 * DO NOT USE IN PRODUCTION.
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
