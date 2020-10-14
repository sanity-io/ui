import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Theme, useTheme} from '../../theme'
import {ResizeObserver} from '../resizeObserver'
import {findMaxBreakpoints, findMinBreakpoints} from './helpers'

export function ElementQuery(props: React.HTMLProps<HTMLDivElement>) {
  const {media} = useTheme() as Theme
  const {children, ...restProps} = props
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(() => {
    return window.innerWidth
  })

  useEffect(() => {
    let ro: ResizeObserver

    if (rootRef.current) {
      const handleResizeEntries: ResizeObserverCallback = (entries) => {
        setWidth(entries[0].contentRect.width)
      }

      ro = new ResizeObserver(handleResizeEntries)
      ro.observe(rootRef.current)
    }

    return () => {
      if (ro) ro.disconnect()
    }
  }, [])

  const max = useMemo(() => findMaxBreakpoints(media, width), [media, width])
  const min = useMemo(() => findMinBreakpoints(media, width), [media, width])

  return (
    <div
      {...restProps}
      data-eq-max={max.length ? max.join(' ') : undefined}
      data-eq-min={min.length ? min.join(' ') : undefined}
      ref={rootRef}
    >
      {children}
    </div>
  )
}
