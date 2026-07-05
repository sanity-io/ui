import {forwardRef, useImperativeHandle, useMemo, useState} from 'react'

import {useElementSize} from '../../hooks'
import {useTheme_v2} from '../../theme'
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
export const ElementQuery = forwardRef(function ElementQuery(
  props: MediaQueryProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'media'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const theme = useTheme_v2()
  const {children, media: _media, ...restProps} = props
  const media = _media ?? theme.media

  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const elementSize = useElementSize(element)
  const width = useMemo(() => elementSize?.border.width ?? window.innerWidth, [elementSize])

  const max = useMemo(() => {
    const eq = findMaxBreakpoints(media, width)

    return eq.length ? eq.join(' ') : undefined
  }, [media, width])
  const min = useMemo(() => {
    const eq = findMinBreakpoints(media, width)

    return eq.length ? eq.join(' ') : undefined
  }, [media, width])

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
