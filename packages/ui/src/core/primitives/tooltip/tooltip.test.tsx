/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {Profiler, useLayoutEffect} from 'react'
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

  describe('The referred element', () => {
    const content = <Text size={1}>{'Tooltip content'}</Text>

    /**
     * Mounting used to schedule a second commit from the first one: the ref callback set the
     * element into state, in the commit phase, at Immediate priority (a "nested update" to the
     * profiler), which also held up the first frame of any view transition revealing the element.
     * The element now lives in a ref, which nothing needs to re-render for. What remains is the
     * pass in which React renders the content of the hidden `Activity` the closed tooltip is in,
     * which a bare `<Activity mode="hidden">` gets as well.
     */
    it('schedules no follow-up commit for the referred element when it mounts', () => {
      const onRender = vi.fn()

      render(
        <Profiler id="tooltip" onRender={onRender}>
          <Tooltip content={content}>
            <Button mode="bleed" text="Hover me" />
          </Tooltip>
        </Profiler>,
        {strict: false},
      )

      expect(onRender.mock.calls.map((call) => call[1])).toEqual(['mount', 'update'])

      // The element is known all the same: hovering positions and shows the tooltip against it
      fireEvent.mouseEnter(screen.getByText('Hover me'))
      expectTooltipVisible('Tooltip content')
    })

    it('attaches the child’s own object ref from the commit that mounts it', () => {
      const ref = {current: null as HTMLButtonElement | null}
      // Read in a layout effect of a parent, which runs in the same commit, after the ref attached
      const seenInLayoutEffect: (HTMLElement | null)[] = []

      function Parent() {
        useLayoutEffect(() => {
          seenInLayoutEffect.push(ref.current)
        }, [])

        return (
          <Tooltip content={content}>
            <Button mode="bleed" ref={ref} text="Hover me" />
          </Tooltip>
        )
      }

      const {unmount} = render(<Parent />, {strict: false})

      expect(ref.current).toBe(screen.getByRole('button', {name: 'Hover me'}))
      expect(seenInLayoutEffect).toEqual([ref.current])

      unmount()

      expect(ref.current).toBeNull()
    })

    it('attaches the child’s own callback ref, and runs the cleanup it returns on unmount', () => {
      const cleanup = vi.fn()
      const callbackRef = vi.fn((_node: HTMLButtonElement | null) => cleanup)

      const {unmount} = render(
        <Tooltip content={content}>
          <Button mode="bleed" ref={callbackRef} text="Hover me" />
        </Tooltip>,
        {strict: false},
      )

      expect(callbackRef).toHaveBeenCalledTimes(1)
      expect(callbackRef).toHaveBeenCalledWith(screen.getByRole('button', {name: 'Hover me'}))
      expect(cleanup).not.toHaveBeenCalled()

      unmount()

      // React 19 semantics: a callback ref that returned a cleanup is not called with `null`
      expect(cleanup).toHaveBeenCalledTimes(1)
      expect(callbackRef).toHaveBeenCalledTimes(1)
    })

    it('calls a callback ref without cleanup with `null` on unmount', () => {
      const callbackRef = vi.fn()

      const {unmount} = render(
        <Tooltip content={content}>
          <Button mode="bleed" ref={callbackRef} text="Hover me" />
        </Tooltip>,
        {strict: false},
      )

      const button = screen.getByRole('button', {name: 'Hover me'})

      unmount()

      expect(callbackRef.mock.calls).toEqual([[button], [null]])
    })
  })

  describe('Toggling the `disabled` prop', () => {
    /**
     * The tree shape must not depend on `disabled`: a consumer may gate the tooltip through it
     * while the referred element keeps its DOM node, state and focus. Returning the bare child in
     * the disabled branch and a fragment otherwise would remount the referred element each time
     * `disabled` flips.
     */
    it('keeps the referred element mounted when `disabled` toggles', () => {
      const renderTooltip = (disabled: boolean) => (
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} disabled={disabled}>
          <input aria-label="Reference" />
        </Tooltip>
      )

      const {rerender} = render(renderTooltip(false))

      const input = screen.getByRole('textbox', {name: 'Reference'})

      act(() => input.focus())
      fireEvent.change(input, {target: {value: 'draft'}})
      expect(input).toHaveFocus()
      expect(input).toHaveValue('draft')

      rerender(renderTooltip(true))

      // Same DOM node, still focused, uncontrolled value intact
      expect(screen.getByRole('textbox', {name: 'Reference'})).toBe(input)
      expect(input).toHaveFocus()
      expect(input).toHaveValue('draft')

      rerender(renderTooltip(false))

      expect(screen.getByRole('textbox', {name: 'Reference'})).toBe(input)
      expect(input).toHaveFocus()
      expect(input).toHaveValue('draft')
    })

    it('renders no tooltip while disabled, and works again once re-enabled', () => {
      const renderTooltip = (disabled: boolean) => (
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} disabled={disabled}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      )

      const {rerender} = render(renderTooltip(false))

      const button = screen.getByRole('button', {name: 'Hover me'})

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')

      rerender(renderTooltip(true))

      // Not even a hidden tooltip is kept in the DOM while disabled
      expect(document.querySelector('[data-ui="Tooltip"]')).toBeNull()
      expect(screen.queryByText('Tooltip content')).toBeNull()

      fireEvent.mouseLeave(button)
      fireEvent.mouseEnter(button)
      expect(document.querySelector('[data-ui="Tooltip"]')).toBeNull()

      rerender(renderTooltip(false))

      // `disabled` only hides the tooltip, it does not reset the hover state: re-enabled while
      // the (still mounted) referred element is hovered, the tooltip shows right away
      expect(screen.getByRole('button', {name: 'Hover me'})).toBe(button)
      expectTooltipVisible('Tooltip content')

      // Once the pointer has left, re-enabling shows nothing until the next hover
      fireEvent.mouseLeave(button)
      rerender(renderTooltip(true))
      rerender(renderTooltip(false))
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')
    })
  })

  describe('Rendering without `content`', () => {
    const renderTooltip = (content: React.ReactNode) => (
      <Tooltip content={content}>
        <Button mode="bleed" text="Hover me" />
      </Tooltip>
    )

    it('hides the tooltip while `content` is empty, and shows it again once there is content', () => {
      const {rerender} = render(renderTooltip(<Text size={1}>{'Tooltip content'}</Text>))

      const button = screen.getByRole('button', {name: 'Hover me'})

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')

      rerender(renderTooltip(null))
      expectTooltipHidden('Tooltip content')

      // Still hovered, so content arriving shows the tooltip without another `mouseenter`
      rerender(renderTooltip(<Text size={1}>{'Tooltip content'}</Text>))
      expectTooltipVisible('Tooltip content')

      // Not hovered any more: new content stays hidden until the next hover
      fireEvent.mouseLeave(button)
      rerender(renderTooltip(null))
      rerender(renderTooltip(<Text size={1}>{'Tooltip content'}</Text>))
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')
    })

    it('does not show an empty tooltip when hovered', () => {
      render(renderTooltip(undefined))

      fireEvent.mouseEnter(screen.getByRole('button', {name: 'Hover me'}))

      const tooltip = document.querySelector('[data-ui="Tooltip"]')

      if (tooltip) {
        expect(tooltip).not.toBeVisible()
      }
    })
  })

  /**
   * `isOpen` is delayed visibility, not the current hover state: after the pointer leaves it stays
   * true for the close delay. A tooltip that is suppressed (disabled, or without content) when the
   * pointer leaves must not keep that lingering state, or un-suppressing it before the delay has
   * elapsed would show it under a pointer that already left.
   */
  describe('Suppressing an open tooltip with a close delay', () => {
    const CLOSE_DELAY = 150

    function advance(ms: number) {
      // oxlint-disable-next-line no-floating-promises
      act(() => vi.advanceTimersByTime(ms))
    }

    const renderTooltip = ({
      content = <Text size={1}>{'Tooltip content'}</Text>,
      disabled = false,
    }: {content?: React.ReactNode; disabled?: boolean} = {}) => (
      <Tooltip content={content} delay={{close: CLOSE_DELAY}} disabled={disabled}>
        <Button mode="bleed" text="Hover me" />
      </Tooltip>
    )

    it('stays hidden when re-enabled within the close delay after the pointer left while disabled', () => {
      const {rerender} = render(renderTooltip())
      const button = screen.getByRole('button', {name: 'Hover me'})

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')

      rerender(renderTooltip({disabled: true}))
      expect(document.querySelector('[data-ui="Tooltip"]')).toBeNull()

      // Leaving a suppressed tooltip closes it at once, so no close delay is pending here
      fireEvent.mouseLeave(button)
      advance(CLOSE_DELAY / 3)

      rerender(renderTooltip({disabled: false}))
      expectTooltipHidden('Tooltip content')

      advance(CLOSE_DELAY)
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')
    })

    it('stays hidden when given content within the close delay after the pointer left while it had none', () => {
      const {rerender} = render(renderTooltip())
      const button = screen.getByRole('button', {name: 'Hover me'})

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')

      rerender(renderTooltip({content: null}))
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseLeave(button)
      advance(CLOSE_DELAY / 3)

      rerender(renderTooltip())
      expectTooltipHidden('Tooltip content')

      advance(CLOSE_DELAY)
      expectTooltipHidden('Tooltip content')

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')
    })

    it('shows right away when re-enabled while still hovered, then lingers for the close delay as usual', () => {
      const {rerender} = render(renderTooltip())
      const button = screen.getByRole('button', {name: 'Hover me'})

      fireEvent.mouseEnter(button)
      expectTooltipVisible('Tooltip content')

      rerender(renderTooltip({disabled: true}))
      expect(document.querySelector('[data-ui="Tooltip"]')).toBeNull()

      advance(CLOSE_DELAY / 3)
      rerender(renderTooltip({disabled: false}))
      expectTooltipVisible('Tooltip content')

      // Enabled again, leaving closes with the configured delay
      fireEvent.mouseLeave(button)
      expectTooltipVisible('Tooltip content')
      advance(CLOSE_DELAY)
      expectTooltipHidden('Tooltip content')
    })
  })
})
