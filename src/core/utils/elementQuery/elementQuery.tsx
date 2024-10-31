import {ForwardedRef, forwardRef, useImperativeHandle, useMemo, useState} from 'react'

import {useTheme_v2} from '../../_compat'
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

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export const ElementQuery = forwardRef(function ElementQuery(
  props: Props<MediaQueryProps, 'div'>,
  forwardedRef: ForwardedRef<HTMLDivElement>,
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
