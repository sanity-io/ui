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
const BODY_WIDTH = 1024

interface MeasuredElement {
  element: HTMLDivElement
  offsetWidth: Mock<() => number>
}

/**
 * The tooltip caps its width to the narrowest of the boundary and portal elements (falling
 * back to `document.body` when the portal has no width). Reading their `offsetWidth` forces a
 * synchronous layout, so it must only happen when the tooltip opens — not on mount of a closed
 * tooltip, not on re-renders, never during render. Every element the tooltip can measure gets
 * its own spy: the React Compiler regression this guards against (the suite runs through the
 * compiler, see `vitest.config.ts`) lifts `portalElement?.offsetWidth` into a render-time memo
 * dependency, so the portal and body reads matter as much as the boundary read.
 *
 * The tests are synchronous on purpose: floating-ui also measures the boundary while it
 * positions an open tooltip, but it does so asynchronously, so no `await` means those reads
 * never land in the counts below (and each element gets a fresh spy per test, so reads that
 * trail a previous test's open tooltip cannot leak in either).
 */
describe('Tooltip max width measurement', () => {
  let boundary: MeasuredElement
  let portal: MeasuredElement
  let bodyOffsetWidth: Mock<() => number>

  function createMeasuredElement(width: number): MeasuredElement {
    const element = document.createElement('div')
    const offsetWidth = vi.fn(() => width)

    Object.defineProperty(element, 'offsetWidth', {get: offsetWidth})
    document.body.appendChild(element)

    return {element, offsetWidth}
  }

  beforeEach(() => {
    boundary = createMeasuredElement(BOUNDARY_WIDTH)
    portal = createMeasuredElement(PORTAL_WIDTH)
    bodyOffsetWidth = vi.fn(() => BODY_WIDTH)
    Object.defineProperty(document.body, 'offsetWidth', {get: bodyOffsetWidth, configurable: true})
  })

  afterEach(() => {
    boundary.element.remove()
    portal.element.remove()
    Reflect.deleteProperty(document.body, 'offsetWidth')
  })

  function expectNoMeasurement() {
    expect(boundary.offsetWidth).not.toHaveBeenCalled()
    expect(portal.offsetWidth).not.toHaveBeenCalled()
    expect(bodyOffsetWidth).not.toHaveBeenCalled()
  }

  function expectMeasuredOnce() {
    expect(boundary.offsetWidth).toHaveBeenCalledTimes(1)
    expect(portal.offsetWidth).toHaveBeenCalledTimes(1)
    // The body is only a fallback for a portal without a width
    expect(bodyOffsetWidth).not.toHaveBeenCalled()
  }

  function renderTooltip({
    boundaryElement = boundary.element,
    content = 'Tooltip content',
    disabled = false,
  }: {boundaryElement?: HTMLElement; content?: string; disabled?: boolean} = {}) {
    return (
      <PortalProvider element={portal.element}>
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

    expectNoMeasurement()

    // Unrelated re-renders of a closed tooltip do not measure either
    rerender(renderTooltip({content: 'Other content'}))

    expectNoMeasurement()
  })

  it('does not measure when a disabled tooltip is hovered', () => {
    const {rerender} = render(renderTooltip({disabled: true}))

    // Hovering flips the open state for one commit before the close effect runs; the
    // measurement is gated out of that commit too
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    expectNoMeasurement()

    // Enabled again, the next hover measures (the child is queried again: enabling currently
    // remounts it, see #3116)
    rerender(renderTooltip({disabled: false}))

    expectNoMeasurement()

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    expect(screen.getByText('Tooltip content')).toBeVisible()
    expectMeasuredOnce()
  })

  it('measures when the tooltip opens and caps the width to the narrowest element', () => {
    render(renderTooltip())

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    const content = screen.getByText('Tooltip content')

    expect(content).toBeVisible()
    expectMeasuredOnce()
    expect(content.closest('[data-ui="Tooltip"]')).toHaveStyle({
      maxWidth: `${BOUNDARY_WIDTH - DEFAULT_TOOLTIP_PADDING * 2}px`,
    })
  })

  it('measures once per open, not on re-renders while the tooltip stays open', () => {
    const {rerender} = render(renderTooltip())
    const button = screen.getByText('Hover me')

    fireEvent.mouseEnter(button)

    expectMeasuredOnce()

    // Neither an unrelated re-render…
    rerender(renderTooltip({content: 'Other content'}))

    expect(screen.getByText('Other content')).toBeVisible()
    expectMeasuredOnce()

    // …nor a new boundary element measures again while open
    const otherBoundary = createMeasuredElement(BOUNDARY_WIDTH)

    rerender(renderTooltip({boundaryElement: otherBoundary.element, content: 'Other content'}))

    expect(otherBoundary.offsetWidth).not.toHaveBeenCalled()
    expectMeasuredOnce()

    // The next open measures the current boundary (and the portal again)
    fireEvent.mouseLeave(button)
    fireEvent.mouseEnter(button)

    expect(otherBoundary.offsetWidth).toHaveBeenCalledTimes(1)
    expect(portal.offsetWidth).toHaveBeenCalledTimes(2)
    otherBoundary.element.remove()
  })
})
