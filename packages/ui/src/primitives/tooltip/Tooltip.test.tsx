import {act, fireEvent, screen} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '$test/utils'

import {Button} from '../button/Button'
import {Tooltip} from './Tooltip'
import {TooltipDelayGroupProvider} from './tooltipDelayGroup/TooltipDelayGroupProvider'

async function advance(ms: number) {
  await act(async () => {
    vi.advanceTimersByTime(ms)
  })
}

async function flushAll() {
  await act(async () => {
    await vi.runAllTimersAsync()
  })
}

// Fake timers
beforeEach(() => {
  vi.useFakeTimers()
})

// Running all pending timers and switching to real timers
afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
})

describe('Tooltip', () => {
  describe('Using same delay for open and close', () => {
    it('should hide and show the tooltip content when hovered, with no delay', () => {
      render(
        <Tooltip animate={false} delay={0} placement={'top'} text="Tooltip content">
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      // With delay=0, advance timers to show tooltip
      act(() => vi.advanceTimersByTime(1))
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()

      fireEvent.mouseLeave(button)

      // Advance timers to hide tooltip
      act(() => vi.advanceTimersByTime(1))
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('should support delays to show and hide the tooltip.', () => {
      vi.useFakeTimers()
      const delay = 200

      render(
        <Tooltip animate={false} delay={delay} placement={'top'} text="Tooltip content">
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      act(() => vi.advanceTimersByTime(delay / 2))
      // Content should not be rendered yet
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(delay / 2))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      fireEvent.mouseLeave(button)
      // Validate tooltip content is still showing.
      screen.getByText('Tooltip content')
      act(() => vi.advanceTimersByTime(delay))
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('should support different open and close delays to show and hide the tooltip.', () => {
      vi.useFakeTimers()
      const openDelay = 200
      const closeDelay = 150

      render(
        <Tooltip
          animate={false}
          delay={{
            open: openDelay,
            close: closeDelay,
          }}
          placement={'top'}
          text="Tooltip content"
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      act(() => vi.advanceTimersByTime(openDelay / 2))
      // Content should not be rendered yet
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(openDelay / 2))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      fireEvent.mouseLeave(button)
      // Validate tooltip content is still showing.
      screen.getByText('Tooltip content')
      act(() => vi.advanceTimersByTime(closeDelay))
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  describe('Using the <TooltipDelayGroupProvider />', () => {
    it('should support groups with the same delay to open and close.', async () => {
      const delay = 150

      vi.useFakeTimers()
      render(
        <TooltipDelayGroupProvider delay={delay}>
          <Tooltip animate={false} delay={400} placement={'top'} text="Tooltip 1">
            <Button mode="bleed" text="Button 1" />
          </Tooltip>
          <Tooltip
            animate={false}
            delay={400} // This should be overridden by the group delay
            placement={'top'}
            text="Tooltip 2"
          >
            <Button mode="bleed" text="Button 2" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button1 = screen.getByText('Button 1')
      const button2 = screen.getByText('Button 2')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      act(() => vi.advanceTimersByTime(delay / 2))
      // Content should not be rendered yet, we have a delay of 150ms
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(delay / 2))

      // Validate Tooltip 1 is rendered
      screen.getByText('Tooltip 1')
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on second button.
      fireEvent.mouseLeave(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not rendered, now tooltip 2 is open.
      act(() => vi.advanceTimersByTime(1))
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseLeave(button2)
      act(() => vi.advanceTimersByTime(delay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      act(() => vi.advanceTimersByTime(1))
      await act(async () => {
        await vi.runAllTimersAsync()
      })
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseLeave(button2)
      act(() => vi.advanceTimersByTime(delay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      act(() => vi.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      act(() => vi.advanceTimersByTime(delay / 2))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(delay / 2))
      screen.getByText('Tooltip 2')
    })

    it('should support groups with different open and close delay.', async () => {
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
          <Tooltip animate={false} delay={400} placement={'top'} text="Tooltip 1">
            <Button mode="bleed" text="Button 1" />
          </Tooltip>
          <Tooltip
            animate={false}
            delay={400} // This should be overridden by the group delay
            placement={'top'}
            text="Tooltip 2"
          >
            <Button mode="bleed" text="Button 2" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button1 = screen.getByText('Button 1')
      const button2 = screen.getByText('Button 2')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      act(() => vi.advanceTimersByTime(openDelay / 2))
      // Content should not be rendered yet, we have a delay of2150ms
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(openDelay / 2))

      // Validate Tooltip 1 is rendered
      screen.getByText('Tooltip 1')
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on second button.
      fireEvent.mouseLeave(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not rendered, now tooltip 2 is open.
      act(() => vi.advanceTimersByTime(1))
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseLeave(button2)
      act(() => vi.advanceTimersByTime(closeDelay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      act(() => vi.advanceTimersByTime(1))
      await act(async () => {
        await vi.runAllTimersAsync()
      })
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseLeave(button2)
      act(() => vi.advanceTimersByTime(closeDelay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      act(() => vi.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      act(() => vi.advanceTimersByTime(openDelay / 2))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => vi.advanceTimersByTime(openDelay / 2))
      screen.getByText('Tooltip 2')
    })
  })

  describe('Closing the <Tooltip /> with the Escape key', () => {
    it('Standalone tooltip closes immediately with Escape key', async () => {
      const delay = 150

      vi.useFakeTimers()

      render(
        <Tooltip animate={false} delay={delay} placement={'top'} text="Tooltip content">
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => {
        fireEvent.focus(button)
      })
      await advance(delay)

      // Validate tooltip content is rendered
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })

      await flushAll()

      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('With <TooltipDelayGroupProvider />  closes immediately with Escape key', () => {
      const delay = 150

      vi.useFakeTimers()

      render(
        <TooltipDelayGroupProvider delay={{close: delay}}>
          <Tooltip animate={false} delay={{close: delay}} placement={'top'} text="Tooltip content">
            <Button mode="bleed" text="Hover me" />
          </Tooltip>
        </TooltipDelayGroupProvider>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => {
        fireEvent.focus(button)
      })
      act(() => vi.advanceTimersByTime(delay))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })

      // Wait for any pending state updates to complete
      act(() => {
        vi.runAllTimers()
      })

      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  describe('Clicking the <Tooltip /> child should close the tooltip', () => {
    it('Should close the tooltip when the context menu is opened (right click)', async () => {
      const delay = 150

      render(
        <Tooltip animate={false} delay={delay} text="Tooltip content">
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => {
        fireEvent.focus(button)
      })
      await advance(delay)

      // Assertion: the tooltip is visible
      expect(screen.getByText('Tooltip content')).toBeVisible()

      act(() => {
        fireEvent.contextMenu(button)
      })

      await flushAll()

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  describe('Used defined events on <Tooltip /> child should fire correctly', () => {
    it('should fire the onBlur event', () => {
      const handleBlur = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button data-testid="btn" mode="bleed" text="Hover me" onBlur={handleBlur} />
        </Tooltip>,
      )

      act(() => fireEvent.blur(screen.getByTestId('btn')))
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClick event', async () => {
      const handleClick = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button data-testid="btn" mode="bleed" text="Hover me" onClick={handleClick} />
        </Tooltip>,
      )

      act(() => {
        fireEvent.click(screen.getByTestId('btn'))
      })

      await flushAll()

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should fire the onContextMenu event', () => {
      const handleContextMenu = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button
            data-testid="btn"
            mode="bleed"
            text="Hover me"
            onContextMenu={handleContextMenu}
          />
        </Tooltip>,
      )

      act(() => fireEvent.contextMenu(screen.getByTestId('btn')))
      expect(handleContextMenu).toHaveBeenCalledTimes(1)
    })

    it('should fire the onFocus event', async () => {
      const handleFocus = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button data-testid="btn" mode="bleed" text="Hover me" onFocus={handleFocus} />
        </Tooltip>,
      )

      act(() => {
        fireEvent.focus(screen.getByTestId('btn'))
      })

      await flushAll()

      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('should fire the onMouseEnter event', async () => {
      const handleMouseEnter = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button data-testid="btn" mode="bleed" text="Hover me" onMouseEnter={handleMouseEnter} />
        </Tooltip>,
      )

      act(() => {
        fireEvent.mouseEnter(screen.getByTestId('btn'))
      })

      await flushAll()

      expect(handleMouseEnter).toHaveBeenCalledTimes(1)
    })

    it('should fire the onMouseLeave event', () => {
      const handleMouseLeave = vi.fn()

      render(
        <Tooltip animate={false} text="Tooltip content">
          <Button data-testid="btn" mode="bleed" text="Hover me" onMouseLeave={handleMouseLeave} />
        </Tooltip>,
      )

      act(() => fireEvent.mouseLeave(screen.getByTestId('btn')))
      expect(handleMouseLeave).toHaveBeenCalledTimes(1)
    })
  })
})
