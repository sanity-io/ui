/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, type Mock, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {PortalProvider} from '../../utils/portal/portalProvider'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {DEFAULT_TOOLTIP_PADDING} from './constants'
import {Tooltip} from './tooltip'

const BOUNDARY_WIDTH = 300
const PORTAL_WIDTH = 500

/**
 * The tooltip caps its width to the narrowest of the boundary and portal elements. Reading
 * their `offsetWidth` forces a synchronous layout, so it must only happen when the tooltip
 * opens — not on mount of a closed tooltip, not on re-renders, never during render.
 *
 * The tests are synchronous on purpose: floating-ui also measures the boundary while it
 * positions an open tooltip, but it does so asynchronously, so no `await` means those reads
 * never land in the counts below (and a boundary gets its own spy per test, so reads that
 * trail a previous test's open tooltip cannot leak in either).
 */
describe('Tooltip max width measurement', () => {
  let boundary: HTMLDivElement
  let boundaryOffsetWidth: Mock<() => number>
  let portal: HTMLDivElement

  function createBoundary(width: number) {
    const element = document.createElement('div')
    const offsetWidth = vi.fn(() => width)

    Object.defineProperty(element, 'offsetWidth', {get: offsetWidth})
    document.body.appendChild(element)

    return {element, offsetWidth}
  }

  beforeEach(() => {
    ;({element: boundary, offsetWidth: boundaryOffsetWidth} = createBoundary(BOUNDARY_WIDTH))
    portal = document.createElement('div')
    Object.defineProperty(portal, 'offsetWidth', {value: PORTAL_WIDTH})
    document.body.appendChild(portal)
  })

  afterEach(() => {
    boundary.remove()
    portal.remove()
  })

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

  it('does not measure while the tooltip is closed', () => {
    const {rerender} = render(renderTooltip())

    expect(boundaryOffsetWidth).not.toHaveBeenCalled()

    // Unrelated re-renders of a closed tooltip do not measure either
    rerender(renderTooltip({content: 'Other content'}))

    expect(boundaryOffsetWidth).not.toHaveBeenCalled()
  })

  it('does not measure when a disabled tooltip is hovered', () => {
    const {rerender} = render(renderTooltip({disabled: true}))

    // Hovering flips the open state for one commit before the close effect runs; the
    // measurement is gated out of that commit too
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    expect(boundaryOffsetWidth).not.toHaveBeenCalled()

    // Enabled again, the next hover measures (the child is queried again: enabling currently
    // remounts it, see #3116)
    rerender(renderTooltip({disabled: false}))

    expect(boundaryOffsetWidth).not.toHaveBeenCalled()

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    expect(screen.getByText('Tooltip content')).toBeVisible()
    expect(boundaryOffsetWidth).toHaveBeenCalledTimes(1)
  })

  it('measures when the tooltip opens and caps the width to the narrowest element', () => {
    render(renderTooltip())

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    const content = screen.getByText('Tooltip content')

    expect(content).toBeVisible()
    expect(boundaryOffsetWidth).toHaveBeenCalledTimes(1)
    expect(content.closest('[data-ui="Tooltip"]')).toHaveStyle({
      maxWidth: `${BOUNDARY_WIDTH - DEFAULT_TOOLTIP_PADDING * 2}px`,
    })
  })

  it('measures once per open, not on re-renders while the tooltip stays open', () => {
    const {rerender} = render(renderTooltip())
    const button = screen.getByText('Hover me')

    fireEvent.mouseEnter(button)

    expect(boundaryOffsetWidth).toHaveBeenCalledTimes(1)

    // Neither an unrelated re-render…
    rerender(renderTooltip({content: 'Other content'}))

    expect(screen.getByText('Other content')).toBeVisible()
    expect(boundaryOffsetWidth).toHaveBeenCalledTimes(1)

    // …nor a new boundary element measures again while open
    const otherBoundary = createBoundary(BOUNDARY_WIDTH)

    rerender(renderTooltip({boundaryElement: otherBoundary.element, content: 'Other content'}))

    expect(otherBoundary.offsetWidth).not.toHaveBeenCalled()

    // The next open measures the current boundary
    fireEvent.mouseLeave(button)
    fireEvent.mouseEnter(button)

    expect(otherBoundary.offsetWidth).toHaveBeenCalledTimes(1)
    otherBoundary.element.remove()
  })
})
