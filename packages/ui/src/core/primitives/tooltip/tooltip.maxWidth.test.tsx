/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, type Mock, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {PortalProvider} from '../../utils/portal/portalProvider'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {Tooltip} from './tooltip'

const BOUNDARY_WIDTH = 300
const PORTAL_WIDTH = 500
const BODY_WIDTH = 1024

interface MeasuredElement {
  element: HTMLDivElement
  offsetWidth: Mock<() => number>
}

/**
 * The tooltip caps its width to the boundary and portal elements. Reading their layout
 * (`offsetWidth`, rects) forces a synchronous layout, so it must only happen while the tooltip is
 * shown — not on mount of a closed tooltip, not on re-renders, not when a disabled tooltip is
 * hovered, and never during render. Every element the tooltip can measure gets its own spy: the
 * React Compiler regression this guards against (the suite runs through the compiler, see
 * `vitest.config.ts`) lifted `portalElement?.offsetWidth` into a render-time memo dependency, so
 * the portal and body reads matter as much as the boundary read.
 *
 * The measurement is Floating UI's: its `size` middleware runs inside the (asynchronous)
 * positioning pass of a shown tooltip. The closed-state assertions are therefore made after that
 * pass had the chance to run, and the shown state is only checked for the reads happening at all,
 * which proves the spies see what Floating UI reads. The applied width is asserted against real
 * layout in the Storybook browser suite (`apps/storybook/tests/tooltipMaxWidth.test.tsx`).
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

  /**
   * Lets Floating UI's asynchronous positioning pass (if any) run to completion. The pass
   * commits its result through `flushSync`, which has to land inside an `act` scope.
   */
  async function flushPositioning() {
    await act(async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 0))
    })
  }

  function expectNoMeasurement() {
    expect(boundary.offsetWidth).not.toHaveBeenCalled()
    expect(portal.offsetWidth).not.toHaveBeenCalled()
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

  it('does not measure while the tooltip is closed', async () => {
    const {rerender} = render(renderTooltip())

    // Neither synchronously (render, layout effects)…
    expectNoMeasurement()

    // …nor asynchronously (a positioning pass)
    await flushPositioning()
    expectNoMeasurement()

    // Unrelated re-renders of a closed tooltip do not measure either
    rerender(renderTooltip({content: 'Other content'}))
    await flushPositioning()

    expectNoMeasurement()

    // Nor does a new boundary element
    const otherBoundary = createMeasuredElement(BOUNDARY_WIDTH)

    rerender(renderTooltip({boundaryElement: otherBoundary.element, content: 'Other content'}))
    await flushPositioning()

    expect(otherBoundary.offsetWidth).not.toHaveBeenCalled()
    expectNoMeasurement()
    otherBoundary.element.remove()
  })

  it('does not measure when a disabled tooltip is hovered', async () => {
    const {rerender} = render(renderTooltip({disabled: true}))

    // Hovering records the hover state, but a disabled tooltip is never shown, so nothing
    // measures
    fireEvent.mouseEnter(screen.getByText('Hover me'))
    await flushPositioning()

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    expectNoMeasurement()

    // Enabled again while still hovered, the tooltip shows and is measured right away
    rerender(renderTooltip({disabled: false}))
    await flushPositioning()

    expect(screen.getByText('Tooltip content')).toBeVisible()
    expect(boundary.offsetWidth).toHaveBeenCalled()
  })

  it('measures the boundary and the portal while the tooltip is shown, and stops once it is closed', async () => {
    const {rerender} = render(renderTooltip())
    const button = screen.getByText('Hover me')

    fireEvent.mouseEnter(button)

    // Nothing is read synchronously when the tooltip opens either (no layout effect): the
    // measurement is part of Floating UI's positioning pass, which is asynchronous
    expect(screen.getByText('Tooltip content')).toBeVisible()
    expectNoMeasurement()

    await flushPositioning()

    expect(boundary.offsetWidth).toHaveBeenCalled()
    expect(portal.offsetWidth).toHaveBeenCalled()
    // The body is no longer a fallback: the viewport bounds the tooltip instead
    expect(bodyOffsetWidth).not.toHaveBeenCalled()

    // jsdom lays nothing out, so Floating UI finds no room at all. The cap is then clamped to
    // zero rather than dropped: a dropped cap would let a tooltip grow across its boundary
    expect(screen.getByText('Tooltip content').closest('[data-ui="Tooltip"]')).toHaveStyle({
      maxWidth: '0px',
    })

    fireEvent.mouseLeave(button)
    await flushPositioning()

    const boundaryReads = boundary.offsetWidth.mock.calls.length
    const portalReads = portal.offsetWidth.mock.calls.length

    // Closed again, nothing measures any more — not even on re-render
    rerender(renderTooltip({content: 'Other content'}))
    await flushPositioning()

    expect(boundary.offsetWidth).toHaveBeenCalledTimes(boundaryReads)
    expect(portal.offsetWidth).toHaveBeenCalledTimes(portalReads)
    expect(bodyOffsetWidth).not.toHaveBeenCalled()
  })
})
