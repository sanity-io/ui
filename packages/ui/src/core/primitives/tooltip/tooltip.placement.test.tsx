/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {Tooltip, type TooltipProps} from './tooltip'

/**
 * Lets Floating UI's asynchronous positioning pass run to completion. The pass commits its result
 * through `flushSync`, which has to land inside an `act` scope.
 */
function flushPositioning() {
  return act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)))
}

/**
 * The middleware reads the boundary element through a ref, so that a change of the element does
 * not recreate it; the other options still have to count as a change for `useFloating`, which
 * compares middleware by their `options` and functions by their source text (see `withBoundary`).
 *
 * jsdom lays nothing out, so the geometry is defined on the elements: a 600×100 boundary and the
 * viewport, a reference near the bottom of the boundary and a 200×30 tooltip. `bottom` overflows,
 * and whether the tooltip flips to `top` or `right` is decided by the fallback placements of the
 * pass.
 */
describe('Tooltip placement', () => {
  const boundary = document.createElement('div')

  function renderTooltip(fallbackPlacements: TooltipProps['fallbackPlacements']) {
    return (
      <Tooltip
        boundaryElement={boundary}
        content={<Text size={1}>Tooltip content</Text>}
        fallbackPlacements={fallbackPlacements}
      >
        <Button
          ref={(node) => {
            if (node) {
              node.getBoundingClientRect = () =>
                DOMRect.fromRect({x: 150, y: 70, width: 100, height: 20})
            }
          }}
          text="Hover me"
        />
      </Tooltip>
    )
  }

  beforeEach(() => {
    for (const [name, value] of [
      ['clientWidth', 600],
      ['clientHeight', 100],
    ] as const) {
      Object.defineProperty(boundary, name, {configurable: true, value})
    }
    document.body.appendChild(boundary)
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 768,
    })
  })

  afterEach(() => {
    boundary.remove()
    // @ts-expect-error -- removes the own property defined above, uncovering the prototype's
    delete document.documentElement.clientWidth
    // @ts-expect-error -- same
    delete document.documentElement.clientHeight
  })

  it('tells Floating UI about changed `fallbackPlacements`, although the boundary is read from a ref', async () => {
    const {rerender} = render(renderTooltip(['top']))
    const tooltip = document.querySelector<HTMLElement>('[data-ui="Tooltip"]')!

    // The tooltip is rendered, hidden, before it is shown, so it can be given a size before the
    // first pass
    Object.defineProperty(tooltip, 'offsetWidth', {configurable: true, value: 200})
    Object.defineProperty(tooltip, 'offsetHeight', {configurable: true, value: 30})

    fireEvent.mouseEnter(screen.getByText('Hover me'))
    await flushPositioning()

    const card = document.querySelector<HTMLElement>('[data-ui="Tooltip__card"]')!

    expect(card.dataset.placement).toBe('top')

    rerender(renderTooltip(['right']))
    await flushPositioning()

    // The changed middleware made Floating UI restart `autoUpdate` with a pass
    expect(card.dataset.placement).toBe('right')
  })
})
