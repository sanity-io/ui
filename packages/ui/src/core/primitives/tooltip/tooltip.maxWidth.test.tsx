/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {PortalProvider} from '../../utils/portal/portalProvider'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {DEFAULT_TOOLTIP_PADDING} from './constants'
import {Tooltip} from './tooltip'

const BOUNDARY_WIDTH = 300
const PORTAL_WIDTH = 500

/**
 * The tooltip caps its width to the narrowest of the boundary and portal elements. Those are
 * `offsetWidth` layout reads, and each one forces a synchronous layout, so they must happen
 * inside an effect and only when the tooltip opens — not on mount of a closed tooltip, not on
 * re-renders, and never during render.
 *
 * This file also runs in the `react-compiler` vitest project (see `vitest.config.ts`), which
 * compiles the source the way the package build does. That run is the one that catches the
 * compiler lifting a member expression on a captured element (`portalElement?.offsetWidth`)
 * into a render-time memo dependency; the plain source run cannot observe it.
 */
describe('Tooltip max width measurement', () => {
  let boundary: HTMLDivElement
  let portal: HTMLDivElement
  let measured: HTMLElement[]

  beforeEach(() => {
    boundary = document.createElement('div')
    portal = document.createElement('div')
    document.body.append(boundary, portal)
    measured = []

    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      measured.push(this)

      if (this === boundary) return BOUNDARY_WIDTH
      if (this === portal) return PORTAL_WIDTH

      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    boundary.remove()
    portal.remove()
  })

  /** Layout reads of the elements the tooltip measures (floating-ui measures others) */
  function measuredWidths() {
    return measured.filter((element) => element === boundary || element === portal)
  }

  function renderTooltip({
    boundaryElement = boundary,
    content = 'Tooltip content',
    disabled = false,
  }: {boundaryElement?: HTMLElement; content?: string; disabled?: boolean} = {}) {
    return (
      <PortalProvider element={portal}>
        <Tooltip
          boundaryElement={boundaryElement}
          content={<Text size={1}>{content}</Text>}
          disabled={disabled}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </PortalProvider>
    )
  }

  it('does not read layout while the tooltip is closed', () => {
    const {rerender} = render(renderTooltip())

    expect(measured).toEqual([])

    // Unrelated re-renders of a closed tooltip do not measure either
    rerender(renderTooltip({content: 'Other content'}))

    expect(measured).toEqual([])
  })

  it('does not read layout when a disabled tooltip is hovered', () => {
    const {rerender} = render(renderTooltip({disabled: true}))
    const button = screen.getByText('Hover me')

    // Hovering flips the open state for one commit before the close effect runs; the
    // measurement is gated out of that commit too
    fireEvent.mouseEnter(button)

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    expect(measured).toEqual([])

    // Enabled again, the next hover measures (the child is queried again: enabling currently
    // remounts it, see #3116)
    fireEvent.mouseLeave(button)
    rerender(renderTooltip({disabled: false}))

    expect(measured).toEqual([])

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    expect(screen.getByText('Tooltip content')).toBeVisible()
    expect(measuredWidths()).toContain(boundary)
  })

  it('measures when the tooltip opens and caps the width to the narrowest element', () => {
    render(renderTooltip())

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    const content = screen.getByText('Tooltip content')

    expect(content).toBeVisible()
    expect(measuredWidths()).toContain(boundary)
    expect(measuredWidths()).toContain(portal)
    expect(content.closest('[data-ui="Tooltip"]')).toHaveStyle({
      maxWidth: `${BOUNDARY_WIDTH - DEFAULT_TOOLTIP_PADDING * 2}px`,
    })
  })

  it('measures once per open, not on re-renders while the tooltip stays open', () => {
    const {rerender} = render(renderTooltip())
    const button = screen.getByText('Hover me')

    fireEvent.mouseEnter(button)

    const readsAfterOpening = measuredWidths().length

    expect(readsAfterOpening).toBeGreaterThan(0)

    // Neither an unrelated re-render…
    rerender(renderTooltip({content: 'Other content'}))

    expect(screen.getByText('Other content')).toBeVisible()
    expect(measuredWidths()).toHaveLength(readsAfterOpening)

    // …nor a new boundary element measures again while open
    const otherBoundary = document.createElement('div')
    document.body.appendChild(otherBoundary)
    rerender(renderTooltip({boundaryElement: otherBoundary, content: 'Other content'}))

    expect(measured).not.toContain(otherBoundary)

    // The next open measures the current boundary
    fireEvent.mouseLeave(button)
    fireEvent.mouseEnter(button)

    expect(measured).toContain(otherBoundary)
    otherBoundary.remove()
  })
})
