import React, {forwardRef, useEffect, useMemo, useState} from 'react'
import {useForwardedRef} from '../../hooks'
import {useTheme} from '../../theme'
import {ResizeObserver} from '../resizeObserver'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

/**
 * DO NOT USE IN PRODUCTION.
 * @beta
 */
export const ElementQuery = forwardRef(function ElementQuery(
  props: React.HTMLProps<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>
) {
  const theme = useTheme()
  const {media} = theme.sanity
  const {children, ...restProps} = props
  const [width, setWidth] = useState(() => window.innerWidth)
  const forwardedRef = useForwardedRef(ref)

  useEffect(() => {
    let ro: ResizeObserver

    if (forwardedRef.current) {
      const handleResizeEntries: ResizeObserverCallback = (entries) => {
        setWidth(entries[0].contentRect.width)
      }

      ro = new ResizeObserver(handleResizeEntries)
      ro.observe(forwardedRef.current)
    }

    return () => {
      if (ro) ro.disconnect()
    }
  }, [forwardedRef])

  const max = useMemo(() => findMaxBreakpoints(media, width), [media, width])
  const min = useMemo(() => findMinBreakpoints(media, width), [media, width])

  return (
    <div
      {...restProps}
      data-eq-max={max.length ? max.join(' ') : undefined}
      data-eq-min={min.length ? min.join(' ') : undefined}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})
