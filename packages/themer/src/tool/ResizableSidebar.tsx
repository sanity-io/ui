import {Box, Card, Layer} from '@sanity/ui'
import {useCallback, useEffect, useRef, useState} from 'react'
import {styled} from 'styled-components'

import {ThemerSidebar} from './ThemerSidebar'

/**
 * The narrowest the sidebar goes — and its default: narrow enough to leave the
 * studio preview as much room as possible, while the themes stack in a single
 * column of preview cards and the editor fits a swatch next to its label.
 */
const MINIMUM_WIDTH = 200

/** Twice the default is as wide as the sidebar goes */
const MAXIMUM_WIDTH = MINIMUM_WIDTH * 2

/** How far one arrow key press resizes the sidebar */
const KEYBOARD_STEP = 16

const WIDTH_STORAGE_KEY = 'sanityStudio:themer:width'

function clampWidth(width: number): number {
  return Math.min(MAXIMUM_WIDTH, Math.max(MINIMUM_WIDTH, Math.round(width)))
}

function readStoredWidth(): number {
  try {
    const stored = Number(localStorage.getItem(WIDTH_STORAGE_KEY))

    return Number.isFinite(stored) && stored > 0 ? clampWidth(stored) : MINIMUM_WIDTH
  } catch {
    return MINIMUM_WIDTH
  }
}

function writeStoredWidth(width: number): void {
  try {
    if (width === MINIMUM_WIDTH) {
      localStorage.removeItem(WIDTH_STORAGE_KEY)
    } else {
      localStorage.setItem(WIDTH_STORAGE_KEY, String(width))
    }
  } catch {
    // Storage can be unavailable (e.g. private browsing) — the width just won't persist
  }
}

const Sidebar = styled(Layer)`
  flex: none;

  /* A view transition group of its own, which the split preview's transition
     (see SplitTransitionStyle in ThemerLayout) leaves alone: it never
     animates, and the Studio copies animating underneath never paint over it */
  view-transition-name: themer-sidebar;

  /* On small screens the sidebar covers the Studio instead of standing next to it */
  &[data-overlay='true'] {
    position: absolute;
    inset: 0;
    width: auto;
  }
`

/**
 * Draws the sidebar's border and gives the resize handle its card colors. It
 * does not clip, so the handle can straddle the border — the content is
 * clipped one level down instead.
 */
const Frame = styled(Card)`
  position: relative;
`

/**
 * The grab area along the sidebar's left edge. It straddles the border so it
 * is easy to hit, and highlights while hovered, focused or dragged.
 */
const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -3px;
  z-index: 1;
  width: 7px;
  cursor: col-resize;
  touch-action: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2px;
    width: 3px;
    background: var(--card-focus-ring-color);
    opacity: 0;
    transition: opacity 100ms;
  }

  &:hover::after,
  &:focus-visible::after,
  &[data-dragging='true']::after {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

/**
 * The themer sidebar, in a layer along the right edge of the Studio. Its left
 * edge drags (or arrow-keys) it wider, up to twice its default width — the
 * width sticks between sessions. As an overlay (small screens) it covers the
 * Studio edge to edge instead, with nothing to resize.
 *
 * @internal
 */
export function ResizableSidebar(props: {overlay: boolean}) {
  const {overlay} = props
  const [width, setWidth] = useState(readStoredWidth)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{pointerId: number; startX: number; startWidth: number} | null>(null)

  useEffect(() => writeStoredWidth(width), [width])

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return

      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      drag.current = {pointerId: event.pointerId, startX: event.clientX, startWidth: width}
      setDragging(true)
    },
    [width],
  )

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return

    // The sidebar sits on the right, so dragging left makes it wider
    setWidth(clampWidth(drag.current.startWidth - (event.clientX - drag.current.startX)))
  }, [])

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return

    drag.current = null
    setDragging(false)
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: KEYBOARD_STEP,
      ArrowRight: -KEYBOARD_STEP,
      Home: MAXIMUM_WIDTH,
      End: -MAXIMUM_WIDTH,
    }
    const step = steps[event.key]

    if (step === undefined) return

    event.preventDefault()
    setWidth((current) => clampWidth(current + step))
  }, [])

  return (
    <Sidebar data-overlay={overlay} style={overlay ? undefined : {width}} zOffset={100}>
      <Frame borderLeft={!overlay} height="fill">
        {!overlay && (
          <ResizeHandle
            aria-label="Resize the themer"
            aria-orientation="vertical"
            aria-valuemax={MAXIMUM_WIDTH}
            aria-valuemin={MINIMUM_WIDTH}
            aria-valuenow={width}
            data-dragging={dragging}
            onDoubleClick={() => setWidth(MINIMUM_WIDTH)}
            onKeyDown={handleKeyDown}
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            // oxlint-disable-next-line prefer-tag-over-role -- a window splitter is a focusable, draggable separator, which an hr is not
            role="separator"
            tabIndex={0}
          />
        )}
        <Box height="fill" overflow="hidden">
          <ThemerSidebar />
        </Box>
      </Frame>
    </Sidebar>
  )
}
