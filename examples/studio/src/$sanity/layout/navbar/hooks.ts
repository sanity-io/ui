import {useElementSize} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'

export function useResponsiveMenu(props: {onHide: () => void; onShow: () => void}) {
  const {onHide, onShow} = props
  const [collapsed, setCollapsed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const expandedWidthRef = useRef<number>(-1)
  const collapsedWidthRef = useRef<number>(-1)
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)
  const rootWidth = useElementSize(rootElement)?.border.width ?? 0
  const wrapperWidth = useElementSize(wrapperElement)?.border.width ?? 0

  useEffect(() => {
    if (rootWidth < 0) return
    if (wrapperWidth < 0) return

    if (!collapsed) {
      if (expandedWidthRef.current === -1) {
        expandedWidthRef.current = wrapperWidth
      }

      if (rootWidth < wrapperWidth) {
        setCollapsed(true)

        return
      }

      // @todo: make sure this is wise/performant
      onShow()

      return
    }

    if (!hidden) {
      if (wrapperWidth === expandedWidthRef.current) {
        return
      }

      if (collapsedWidthRef.current === -1) {
        collapsedWidthRef.current = wrapperWidth
      }

      if (expandedWidthRef.current < rootWidth) {
        setCollapsed(false)

        return
      }

      if (rootWidth < wrapperWidth) {
        onHide()
        setHidden(true)

        return
      }

      return
    }

    if (wrapperWidth !== 0) {
      return
    }

    if (collapsedWidthRef.current < rootWidth) {
      onShow()
      setHidden(false)

      if (expandedWidthRef.current < rootWidth) {
        setCollapsed(false)

        return
      }
    }
  }, [collapsed, hidden, onHide, onShow, rootWidth, wrapperWidth])

  return {collapsed, hidden, rootElement, setRootElement, setWrapperElement, wrapperElement}
}
