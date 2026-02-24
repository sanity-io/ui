import {type RefObject,useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {CommandPalette} from './commandPalette'
import {VIEWPORT_OPTIONS, ZOOM_OPTIONS} from './constants'
import {useCommandController, useCommands} from './lib/commands'
import {useWorkshop} from './useWorkshop'

/** @internal */
export interface WorkshopCommandsProps {
  handleInspectorToggle: () => void
  handleNavigatorToggle: () => void
  iframeElementRef: RefObject<HTMLIFrameElement | null>
}

/**
 * Component that registers all Workshop keyboard commands
 * Must be rendered inside CommandsProvider
 * @internal
 */
export function WorkshopCommands(props: WorkshopCommandsProps) {
  const {handleInspectorToggle, handleNavigatorToggle, iframeElementRef} = props
  const {broadcast, frameReady, viewport, zoom} = useWorkshop()

  const commandController = useCommandController()
  const iframeTargetUnregisterRef = useRef<(() => void) | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Command handlers
  const handlePaletteToggle = useCallback(() => {
    setPaletteOpen((prev) => !prev)
  }, [])

  const handlePaletteClose = useCallback(() => {
    setPaletteOpen(false)
  }, [])
  const handleZoomReset = useCallback(() => {
    broadcast({type: 'workshop/setZoom', value: 1})
  }, [broadcast])

  const handleZoomIn = useCallback(() => {
    const currentIndex = ZOOM_OPTIONS.findIndex((o) => o.value === zoom)
    const nextIndex = Math.min(currentIndex + 1, ZOOM_OPTIONS.length - 1)
    broadcast({type: 'workshop/setZoom', value: ZOOM_OPTIONS[nextIndex].value})
  }, [broadcast, zoom])

  const handleZoomOut = useCallback(() => {
    const currentIndex = ZOOM_OPTIONS.findIndex((o) => o.value === zoom)
    const prevIndex = Math.max(currentIndex - 1, 0)
    broadcast({type: 'workshop/setZoom', value: ZOOM_OPTIONS[prevIndex].value})
  }, [broadcast, zoom])

  const handleViewportNext = useCallback(() => {
    const currentIndex = VIEWPORT_OPTIONS.findIndex((o) => o.name === viewport)
    const nextIndex = Math.min(currentIndex + 1, VIEWPORT_OPTIONS.length - 1)
    broadcast({type: 'workshop/setViewport', value: VIEWPORT_OPTIONS[nextIndex].name})
  }, [broadcast, viewport])

  const handleViewportPrev = useCallback(() => {
    const currentIndex = VIEWPORT_OPTIONS.findIndex((o) => o.name === viewport)
    const prevIndex = Math.max(currentIndex - 1, 0)
    broadcast({type: 'workshop/setViewport', value: VIEWPORT_OPTIONS[prevIndex].name})
  }, [broadcast, viewport])

  const handleNavHome = useCallback(() => {
    broadcast({type: 'workshop/setPath', value: '/'})
  }, [broadcast])

  // Register commands with handlers
  useCommands(
    useMemo(
      () => [
        {
          type: 'chord' as const,
          id: 'palette.toggle',
          keys: ['mod', 'k'],
          handler: handlePaletteToggle,
        },
        {
          type: 'chord' as const,
          id: 'zoom.reset',
          keys: ['mod', '0'],
          handler: handleZoomReset,
        },
        {
          type: 'chord' as const,
          id: 'zoom.in',
          keys: ['mod', '='],
          handler: handleZoomIn,
        },
        {
          type: 'chord' as const,
          id: 'zoom.out',
          keys: ['mod', '-'],
          handler: handleZoomOut,
        },
        {
          type: 'chord' as const,
          id: 'viewport.next',
          keys: ['mod', '['],
          handler: handleViewportNext,
        },
        {
          type: 'chord' as const,
          id: 'viewport.prev',
          keys: ['mod', ']'],
          handler: handleViewportPrev,
        },
        {
          type: 'chord' as const,
          id: 'navigator.toggle',
          keys: ['mod', '\\'],
          handler: handleNavigatorToggle,
        },
        {
          type: 'chord' as const,
          id: 'inspector.toggle',
          keys: ['mod', 'i'],
          handler: handleInspectorToggle,
        },
        {
          type: 'sequence' as const,
          id: 'nav.home',
          keys: ['g', 'h'],
          handler: handleNavHome,
        },
      ],
      [
        handleInspectorToggle,
        handleNavHome,
        handleNavigatorToggle,
        handlePaletteToggle,
        handleViewportNext,
        handleViewportPrev,
        handleZoomIn,
        handleZoomOut,
        handleZoomReset,
      ],
    ),
  )

  // Set up iframe keyboard listener when iframe is ready
  useEffect(() => {
    const el = iframeElementRef.current

    if (!el) {
      return undefined
    }

    // Clean up any existing listener
    if (iframeTargetUnregisterRef.current) {
      iframeTargetUnregisterRef.current()
      iframeTargetUnregisterRef.current = null
    }

    // Set up listener
    const onLoad = () => {
      if (el.contentWindow) {
        iframeTargetUnregisterRef.current = commandController.addTarget(el.contentWindow)
      }
    }

    if (el.contentDocument?.readyState === 'complete') {
      onLoad()
      return undefined
    } else {
      el.addEventListener('load', onLoad, {once: true})
      return () => {
        el.removeEventListener('load', onLoad)
        if (iframeTargetUnregisterRef.current) {
          iframeTargetUnregisterRef.current()
          iframeTargetUnregisterRef.current = null
        }
      }
    }
  }, [commandController, frameReady, iframeElementRef])

  return <CommandPalette open={paletteOpen} onClose={handlePaletteClose} />
}
