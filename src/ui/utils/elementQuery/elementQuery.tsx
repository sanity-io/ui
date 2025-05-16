import {BREAKPOINTS} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, useImperativeHandle, useMemo, useState} from 'react'

import {useElementSize} from '../../hooks'
import {Props} from '../../types'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface MediaQueryProps {
  media?: number[]
}

const defaultBreakpoints = Object.values(BREAKPOINTS)

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export const ElementQuery = forwardRef(function ElementQuery(
  props: Props<MediaQueryProps, 'div'>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  const {children, media: mediaProp, ...restProps} = props
  const breakpoints = mediaProp ?? defaultBreakpoints

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
    <div data-ui="ElementQuery" {...restProps} data-eq-max={max} data-eq-min={min} ref={setElement}>
      {children}
    </div>
  )
})
ElementQuery.displayName = 'ForwardRef(ElementQuery)'
