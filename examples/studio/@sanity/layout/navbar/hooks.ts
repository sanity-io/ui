import {ResizeObserver} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'

export function useResponsiveMenu(props: {onHide: () => void; onShow: () => void}) {
  const {onHide, onShow} = props
  const [collapsed, setCollapsed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const expandedWidthRef = useRef<number>(-1)
  const collapsedWidthRef = useRef<number>(-1)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [widths, setWidths] = useState({current: -1, wrapper: -1})
  const widthsRef = useRef(widths)

  useEffect(() => {
    if (widths.current < 0) return
    if (widths.wrapper < 0) return

    if (!collapsed) {
      if (expandedWidthRef.current === -1) {
        expandedWidthRef.current = widths.wrapper
      }

      if (widths.current < widths.wrapper) {
        setCollapsed(true)

        return
      }

      // @todo: make sure this is wise/performant
      onShow()

      return
    }

    if (!hidden) {
      if (widths.wrapper === expandedWidthRef.current) {
        return
      }

      if (collapsedWidthRef.current === -1) {
        collapsedWidthRef.current = widths.wrapper
      }

      if (expandedWidthRef.current < widths.current) {
        setCollapsed(false)

        return
      }

      if (widths.current < widths.wrapper) {
        onHide()
        setHidden(true)

        return
      }

      return
    }

    if (widths.wrapper !== 0) {
      return
    }

    if (collapsedWidthRef.current < widths.current) {
      onShow()
      setHidden(false)

      if (expandedWidthRef.current < widths.current) {
        setCollapsed(false)

        return
      }
    }
  }, [collapsed, hidden, onHide, onShow, widths])

  useEffect(() => {
    const rootElement = rootRef.current
    const wrapperElement = wrapperRef.current

    if (!rootElement || !wrapperElement) return undefined

    const ro = new ResizeObserver((entries) => {
      const nextWidths = {...widthsRef.current}

      for (const entry of entries) {
        const entryWidth = entry.contentRect.width

        if (entry.target === rootElement) {
          nextWidths.current = entryWidth
        }

        if (entry.target === wrapperElement) {
          nextWidths.wrapper = entryWidth
        }
      }

      setWidths(nextWidths)
      widthsRef.current = nextWidths
    })

    ro.observe(rootElement)
    ro.observe(wrapperElement)

    return () => ro.disconnect()
  }, [])

  return {collapsed, hidden, rootRef, wrapperRef}
}
