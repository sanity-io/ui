import {forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react'
import {useElementSize} from '../../hooks'
import {useTheme_v2} from '../../theme'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface MediaQueryProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
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
  const {children, media = theme.media, ...restProps} = props

  const ref = useRef<HTMLDivElement | null>(null)
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const elementSize = useElementSize(element)
  const width = useMemo(() => elementSize?.border.width ?? window.innerWidth, [elementSize])

  const max = useMemo(() => findMaxBreakpoints(media, width), [media, width])
  const min = useMemo(() => findMinBreakpoints(media, width), [media, width])

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el
    setElement(el)
  }, [])

  return (
    <div
      data-ui="ElementQuery"
      {...restProps}
      data-eq-max={max.length ? max.join(' ') : undefined}
      data-eq-min={min.length ? min.join(' ') : undefined}
      ref={setRef}
    >
      {children}
    </div>
  )
})
