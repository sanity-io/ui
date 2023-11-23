/** @jest-environment jsdom */
import {screen, act, fireEvent} from '@testing-library/react'
import '../../../../test/mocks/resizeObserver.mock'
import '../../../../test/mocks/matchMedia.mock'
import {render} from '../../../../test'
import {Text, Button} from '../../primitives'
import {Tooltip, TooltipDelayGroupProvider} from '../tooltip'

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('Tooltip', () => {
  describe('Using same delay for open and close', () => {
    it('should hide and show the tooltip content when hovered, with no delay', () => {
      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} placement={'top'}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('should support delays to show and hide the tooltip.', () => {
      jest.useFakeTimers()
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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      act(() => jest.advanceTimersByTime(delay / 2))
      // Content should not be rendered yet
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(delay / 2))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is still showing.
      screen.getByText('Tooltip content')
      act(() => jest.advanceTimersByTime(delay))
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('should support different open and close delays to show and hide the tooltip.', () => {
      jest.useFakeTimers()
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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

      fireEvent.mouseEnter(button)

      act(() => jest.advanceTimersByTime(openDelay / 2))
      // Content should not be rendered yet
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(openDelay / 2))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      fireEvent.mouseOut(button)
      // Validate tooltip content is still showing.
      screen.getByText('Tooltip content')
      act(() => jest.advanceTimersByTime(closeDelay))
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  describe('Using the <TooltipDelayGroupProvider />', () => {
    it('should support groups with the same delay to open and close.', () => {
      const delay = 150

      jest.useFakeTimers()
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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      act(() => jest.advanceTimersByTime(delay / 2))
      // Content should not be rendered yet, we have a delay of 150ms
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(delay / 2))

      // Validate Tooltip 1 is rendered
      screen.getByText('Tooltip 1')
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on second button.
      fireEvent.mouseOut(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not rendered, now tooltip 2 is open.
      act(() => jest.advanceTimersByTime(1))
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseOut(button2)
      act(() => jest.advanceTimersByTime(delay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      act(() => jest.advanceTimersByTime(1))
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseOut(button2)
      act(() => jest.advanceTimersByTime(delay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      act(() => jest.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      act(() => jest.advanceTimersByTime(delay / 2))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(delay / 2))
      screen.getByText('Tooltip 2')
    })
    it('should support groups with different open and close delay.', () => {
      const openDelay = 250
      const closeDelay = 150

      jest.useFakeTimers()
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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on first button, it should show first tooltip only
      fireEvent.mouseEnter(button1)
      act(() => jest.advanceTimersByTime(openDelay / 2))
      // Content should not be rendered yet, we have a delay of2150ms
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(openDelay / 2))

      // Validate Tooltip 1 is rendered
      screen.getByText('Tooltip 1')
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovers on second button.
      fireEvent.mouseOut(button1)
      fireEvent.mouseEnter(button2)

      // Validate Tooltip 1 is not rendered, now tooltip 2 is open.
      act(() => jest.advanceTimersByTime(1))
      expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument()
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseOut(button2)
      act(() => jest.advanceTimersByTime(closeDelay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Hovering again, should trigger the tooltip to show immediately, as the group is not deactivated yet
      fireEvent.mouseEnter(button2)
      act(() => jest.advanceTimersByTime(1))
      screen.getByText('Tooltip 2')

      // Validate tooltip content is not rendered anymore
      fireEvent.mouseOut(button2)
      act(() => jest.advanceTimersByTime(closeDelay + 1))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()

      // Wait 200ms, the group is deactivated, hovering again should trigger the delay
      act(() => jest.advanceTimersByTime(200))
      fireEvent.mouseEnter(button2)
      act(() => jest.advanceTimersByTime(openDelay / 2))
      expect(screen.queryByText('Tooltip 2')).not.toBeInTheDocument()
      act(() => jest.advanceTimersByTime(openDelay / 2))
      screen.getByText('Tooltip 2')
    })
  })

  describe('Closing the <Tooltip /> with the Escape key', () => {
    it('Standalone tooltip closes immediately with Escape key', () => {
      const delay = 150

      jest.useFakeTimers()

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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      fireEvent.focus(button)
      act(() => jest.advanceTimersByTime(delay))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
    it('With <TooltipDelayGroupProvider />  closes immediately with Escape key', () => {
      const delay = 150

      jest.useFakeTimers()

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

      // Validate tooltip content is not rendered
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      fireEvent.focus(button)

      act(() => jest.advanceTimersByTime(delay))

      // Validate tooltip content is rendered
      screen.getByText('Tooltip content')

      act(() => {
        fireEvent.keyDown(button, {key: 'Escape', code: 'Escape'})
      })
      // Validate tooltip content is not rendered anymore
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
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

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      fireEvent.focus(button)

      act(() => jest.advanceTimersByTime(delay))

      // Assertion: the tooltip is not visible
      expect(screen.queryByText('Tooltip content')).toBeVisible()

      act(() => fireEvent.click(button))

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })

    it('Should close the tooltip when the context menu is opened (right click)', () => {
      const delay = 150

      render(
        <Tooltip content={<Text size={1}>{'Tooltip content'}</Text>} delay={delay}>
          <Button mode="bleed" text="Hover me" />
        </Tooltip>,
      )

      const button = screen.getByText('Hover me')

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      fireEvent.focus(button)

      act(() => jest.advanceTimersByTime(delay))

      // Assertion: the tooltip is not visible
      expect(screen.queryByText('Tooltip content')).toBeVisible()

      act(() => fireEvent.contextMenu(button))

      // Assertion: tooltip does not exist in the document
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  describe('Used defined events on <Tooltip /> child should fire correctly', () => {
    const handleBlur = jest.fn()
    const handleClick = jest.fn()
    const handleContextMenu = jest.fn()
    const handleFocus = jest.fn()
    const handleMouseEnter = jest.fn()
    const handleMouseLeave = jest.fn()

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

    afterEach(() => jest.clearAllMocks())

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
