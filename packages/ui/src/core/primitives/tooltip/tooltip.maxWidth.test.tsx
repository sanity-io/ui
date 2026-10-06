/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {DEFAULT_TOOLTIP_PADDING} from './constants'
import {Tooltip} from './tooltip'

const BOUNDARY_WIDTH = 300
const BODY_WIDTH = 1024

/**
 * The tooltip caps its width to the narrowest of the boundary, portal and `document.body`
 * widths. Those are `offsetWidth` layout reads, and each one forces a synchronous layout, so
 * they must happen inside an effect and only when the tooltip opens — not on mount of a closed
 * tooltip, not on re-renders, and never during render. (The React Compiler turns an
 * unconditional property read inside an effect callback into a render-time memo dependency.
 * This suite runs the uncompiled source and cannot observe that; `dist/tooltip.js` is the place
 * to check it.)
 */
describe('Tooltip max width measurement', () => {
  let boundary: HTMLDivElement
  let measured: HTMLElement[]

  beforeEach(() => {
    boundary = document.createElement('div')
    document.body.appendChild(boundary)
    measured = []

    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      measured.push(this)

      if (this === boundary) return BOUNDARY_WIDTH
      if (this === document.body) return BODY_WIDTH

      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    boundary.remove()
  })

  /** Layout reads of the elements the tooltip measures (floating-ui measures others) */
  function measuredWidths() {
    return measured.filter((element) => element === boundary || element === document.body)
  }

  function renderTooltip(content = 'Tooltip content', boundaryElement = boundary) {
    return (
      <Tooltip boundaryElement={boundaryElement} content={<Text size={1}>{content}</Text>}>
        <Button mode="bleed" text="Hover me" />
      </Tooltip>
    )
  }

  it('does not read layout while the tooltip is closed', () => {
    const {rerender} = render(renderTooltip())

    expect(measuredWidths()).toEqual([])

    // Unrelated re-renders of a closed tooltip do not measure either
    rerender(renderTooltip('Other content'))

    expect(measuredWidths()).toEqual([])
  })

  it('measures when the tooltip opens and caps the width to the narrowest element', () => {
    render(renderTooltip())

    fireEvent.mouseEnter(screen.getByText('Hover me'))

    const content = screen.getByText('Tooltip content')

    expect(content).toBeVisible()
    expect(measuredWidths()).toContain(boundary)
    expect(measuredWidths()).toContain(document.body)
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
    rerender(renderTooltip('Other content'))

    expect(screen.getByText('Other content')).toBeVisible()
    expect(measuredWidths()).toHaveLength(readsAfterOpening)

    // …nor a new boundary element measures again while open
    const otherBoundary = document.createElement('div')
    document.body.appendChild(otherBoundary)
    rerender(renderTooltip('Other content', otherBoundary))

    expect(measured).not.toContain(otherBoundary)

    // The next open measures the current boundary
    fireEvent.mouseLeave(button)
    fireEvent.mouseEnter(button)

    expect(measured).toContain(otherBoundary)
    otherBoundary.remove()
  })
})
