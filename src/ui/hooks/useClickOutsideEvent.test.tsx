/** @jest-environment jsdom */

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useRef} from 'react'

import {useClickOutsideEvent} from './useClickOutsideEvent'

describe('useClickOutsideEvent', () => {
  /**
   * This suite demonstrates the new hook `useClickOutsideEvent` that replaces `useClickOutside`
   */

  it('calls the handler when clicking outside of the array of elements', async () => {
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      useClickOutsideEvent(handler, () => [buttonRef.current, popoverRef.current])

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={popoverRef} />
          <div data-testid="outside" />
        </>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    expect(handler).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('the elements array flattens nested arrays one level deep', async () => {
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      useClickOutsideEvent(handler, () => [
        null,
        [null, buttonRef.current],
        [popoverRef.current, null],
        null,
      ])

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={popoverRef} />
          <div data-testid="outside" />
        </>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    expect(handler).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('it can set a boundary to scope outside click events', async () => {
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)
      const boundaryRef = useRef<HTMLDivElement | null>(null)

      useClickOutsideEvent(
        handler,
        () => [buttonRef.current, popoverRef.current],
        () => boundaryRef.current,
      )

      return (
        <>
          <div ref={boundaryRef}>
            <button data-testid="button" ref={buttonRef} />
            <div data-testid="popover" ref={popoverRef} />
            <div data-testid="inside" />
          </div>
          <div data-testid="outside" />
        </>
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    // Since it's outside the boundary it should be ignored
    await user.click(screen.getByTestId('outside'))
    expect(handler).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('inside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
