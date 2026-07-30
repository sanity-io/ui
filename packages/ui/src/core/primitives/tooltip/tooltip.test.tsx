/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {Tooltip} from './tooltip'
import {TooltipDelayGroupProvider} from './tooltipDelayGroup/tooltipDelayGroupProvider'

beforeEach(() => {
  vi.useFakeTimers()
})

// Run all pending timers and switch back to real timers
afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

/**
 * Closed tooltips are pre-rendered in the DOM inside a hidden `<Activity>` boundary (or not yet
 * rendered at all, since hidden activities render at low priority), so "hidden" means either
 * absent or present-but-invisible.
 */
function expectTooltipHidden(text: string) {
  const element = screen.queryByText(text)

  if (element) {
    expect(element).not.toBeVisible()
  }
}

function expectTooltipVisible(text: string) {
  expect(screen.getByText(text)).toBeVisible()
}

describe('Tooltip', () => {
  describe('Using same delay for open and close', () => {
    it('should hide and show the tooltip content when hovered, with no delay', () => {
      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} placement={'top'}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)

      // Validate tooltip content is visible
      expectTooltipVisible('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is not visible anymore
      expectTooltipHidden('Tooltip content')
    })
    it('should support delays to show and hide the tooltip.', () => {
      vi.useFakeTimers()
      const delay = 200

      render(
        <Tooltip
          content={<Text size={1}>{'Tooltip content'}</Text>}
          placement={'top'}
          delay={delay}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)

      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))
      // Content should not be visible yet
      expectTooltipHidden('Tooltip content')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))

      // Validate tooltip content is visible
      expectTooltipVisible('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is still showing.
      expectTooltipVisible('Tooltip content')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay))
      // Validate tooltip content is not visible anymore
      expectTooltipHidden('Tooltip content')
    })
    it('should support different open and close delays to show and hide the tooltip.', () => {
      vi.useFakeTimers()
      const openDelay = 200
      const closeDelay = 150

      render(
        <Tooltip
          content={<Text size={1}>{'Tooltip content'}</Text>}
          placement={'top'}
          delay={{
            open: openDelay,
            close: closeDelay,
          }}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)

      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))
      // Content should not be visible yet
      expectTooltipHidden('Tooltip content')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))

      // Validate tooltip content is visible
      expectTooltipVisible('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is still showing.
      expectTooltipVisible('Tooltip content')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(closeDelay))
      // Validate tooltip content is not visible anymore
      expectTooltipHidden('Tooltip content')
    })
  })

  describe('Using the <TooltipDelayGroupProvider />', () => {
    it('should support groups with the same delay to open and close.', () => {
      const delay = 150

      vi.useFakeTimers()
      render(
        <TooltipDelayGroupProvider delay={delay}>
          <Tooltip content={<Text size={1}>{'Tooltip 1'}</Text>} placement={'top'} delay={400}>
            <Button mode="bleed" text="Button 1" />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{'Tooltip 2'}</Text>}
            placement={'top'}
            delay={400} // This should be overridden by the group delay
          >
            <Button mode="bleed" text="Button 2" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button1 = screen.getByText('Button 1')
      const button2 = screen.getByText('Button 2')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip 1')
      expectTooltipHidden('Tooltip 2')

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))
      // Content should not be visible yet, we have a delay of 150ms
      expectTooltipHidden('Tooltip 1')
      expectTooltipHidden('Tooltip 2')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))

      // Validate Tooltip 1 is visible
      expectTooltipVisible('Tooltip 1')
      expectTooltipHidden('Tooltip 2')

      // Hovers on second button.
      fireEvent.mouseOut(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not visible, now tooltip 2 is open.
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(1))
      expectTooltipHidden('Tooltip 1')
      expectTooltipVisible('Tooltip 2')

      // Validate tooltip content is not visible anymore
      fireEvent.mouseOut(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay + 1))
      expectTooltipHidden('Tooltip 2')

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(1))
      expectTooltipVisible('Tooltip 2')

      // Validate tooltip content is not visible anymore
      fireEvent.mouseOut(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay + 1))
      expectTooltipHidden('Tooltip 2')

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))
      expectTooltipHidden('Tooltip 2')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay / 2))
      expectTooltipVisible('Tooltip 2')
    })
    it('should support groups with different open and close delay.', () => {
      const openDelay = 250
      const closeDelay = 150

      vi.useFakeTimers()
      render(
        <TooltipDelayGroupProvider
          delay={{
            open: openDelay,
            close: closeDelay,
          }}
        >
          <Tooltip content={<Text size={1}>{'Tooltip 1'}</Text>} placement={'top'} delay={400}>
            <Button mode="bleed" text="Button 1" />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{'Tooltip 2'}</Text>}
            placement={'top'}
            delay={400} // This should be overridden by the group delay
          >
            <Button mode="bleed" text="Button 2" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button1 = screen.getByText('Button 1')
      const button2 = screen.getByText('Button 2')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip 1')
      expectTooltipHidden('Tooltip 2')

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))
      // Content should not be visible yet, we have a delay of2150ms
      expectTooltipHidden('Tooltip 1')
      expectTooltipHidden('Tooltip 2')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))

      // Validate Tooltip 1 is visible
      expectTooltipVisible('Tooltip 1')
      expectTooltipHidden('Tooltip 2')

      // Hovers on second button.
      fireEvent.mouseOut(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not visible, now tooltip 2 is open.
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(1))
      expectTooltipHidden('Tooltip 1')
      expectTooltipVisible('Tooltip 2')

      // Validate tooltip content is not visible anymore
      fireEvent.mouseOut(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(closeDelay + 1))
      expectTooltipHidden('Tooltip 2')

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(1))
      expectTooltipVisible('Tooltip 2')

      // Validate tooltip content is not visible anymore
      fireEvent.mouseOut(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(closeDelay + 1))
      expectTooltipHidden('Tooltip 2')

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))
      expectTooltipHidden('Tooltip 2')
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(openDelay / 2))
      expectTooltipVisible('Tooltip 2')
    })
  })

  describe('Closing the <Tooltip /> with the Escape key', () => {
    it('Standalone tooltip closes immediately with Escape key', () => {
      const delay = 150

      vi.useFakeTimers()

      render(
        <Tooltip
          content={<Text size={1}>{'Tooltip content'}</Text>}
          placement={'top'}
          delay={delay}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip content')
      fireEvent.focus(button)
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay))

      // Validate tooltip content is visible
      expectTooltipVisible('Tooltip content')

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })
      // Validate tooltip content is not visible anymore
      expectTooltipHidden('Tooltip content')
    })
    it('With <TooltipDelayGroupProvider />  closes immediately with Escape key', () => {
      const delay = 150

      vi.useFakeTimers()

      render(
        <TooltipDelayGroupProvider delay={{close: delay}}>
          <Tooltip
            content={<Text size={1}>{'Tooltip content'}</Text>}
            placement={'top'}
            delay={{close: delay}}
          >
            <Button mode="bleed" text="Hover me" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not visible
      expectTooltipHidden('Tooltip content')
      fireEvent.focus(button)

      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay))

      // Validate tooltip content is visible
      expectTooltipVisible('Tooltip content')

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })
      // Validate tooltip content is not visible anymore
      expectTooltipHidden('Tooltip content')
    })
  })

  describe('Clicking the <Tooltip /> child should close the tooltip', () => {
    it('Should close the tooltip when clicked', () => {
      const delay = 150

      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} delay={delay}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Assertion: tooltip is not visible
      expectTooltipHidden('Tooltip content')
      fireEvent.focus(button)

      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay))

      // Assertion: the tooltip is visible
      expectTooltipVisible('Tooltip content')

      // oxlint-disable-next-line no-floating-promises
      act(() => fireEvent.click(button))

      // Assertion: tooltip is not visible
      expectTooltipHidden('Tooltip content')
    })

    it('Should close the tooltip when the context menu is opened (right click)', () => {
      const delay = 150

      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} delay={delay}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Assertion: tooltip is not visible
      expectTooltipHidden('Tooltip content')
      fireEvent.focus(button)

      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(delay))

      // Assertion: the tooltip is visible
      expectTooltipVisible('Tooltip content')

      // oxlint-disable-next-line no-floating-promises
      act(() => fireEvent.contextMenu(button))

      // Assertion: tooltip is not visible
      expectTooltipHidden('Tooltip content')
    })
  })

  describe('Used defined events on <Tooltip /> child should fire correctly', () => {
    const handleBlur = vi.fn()
    const handleClick = vi.fn()
    const handleContextMenu = vi.fn()
    const handleFocus = vi.fn()
    const handleMouseEnter = vi.fn()
    const handleMouseLeave = vi.fn()

    beforeEach(() => {
      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>}>
          <Button
            data-testid="btn"
            mode="bleed"
            onBlur={handleBlur}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            onFocus={handleFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            text="Hover me"
          />
        </Tooltip>,
      )
    })

    afterEach(() => vi.clearAllMocks())

    it('should fire the onBlur event', () => {
      fireEvent.blur(screen.getByTestId('btn'))
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClick event', () => {
      fireEvent.click(screen.getByTestId('btn'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should fire the onContextMenu event', () => {
      fireEvent.contextMenu(screen.getByTestId('btn'))
      expect(handleContextMenu).toHaveBeenCalledTimes(1)
    })

    it('should fire the onFocus event', () => {
      fireEvent.focus(screen.getByTestId('btn'))
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('should fire the onMouseEnter event', () => {
      fireEvent.mouseEnter(screen.getByTestId('btn'))
      expect(handleMouseEnter).toHaveBeenCalledTimes(1)
    })

    it('should fire the onMouseLeave event', () => {
      fireEvent.mouseLeave(screen.getByTestId('btn'))
      expect(handleMouseLeave).toHaveBeenCalledTimes(1)
    })
  })
})
