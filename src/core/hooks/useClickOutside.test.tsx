/** @jest-environment jsdom */

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useEffect, useRef, useState} from 'react'

import {useClickOutside} from './useClickOutside'

describe('useClickOutside', () => {
  /**
   * Specifying the elements array directly:
   * useClickOutside(handler, [buttonElement, popoverElement])
   * instead of in a callback:
   * useClickOutside(handler, () => [buttonElement, popoverElement])
   * is still supported, but deprecated and discouraged. The same is true for the `setElement` callback pattern
   */
  it('calls the handler when clicking outside of the array of elements', async () => {
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = () => {
      const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonElement, popoverElement])

      return (
        <>
          <button data-testid="button" ref={setButtonElement} />
          <div data-testid="popover" ref={setPopoverElement} />
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
      const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

      useClickOutside(handler, [null, [null, buttonElement], [popoverElement, null], null])

      return (
        <>
          <button data-testid="button" ref={setButtonElement} />
          <div data-testid="popover" ref={setPopoverElement} />
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
      const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
      const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonElement, popoverElement], boundaryElement)

      return (
        <>
          <div ref={setBoundaryElement}>
            <button data-testid="button" ref={setButtonElement} />
            <div data-testid="popover" ref={setPopoverElement} />
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

  it('it returns a `setElement` callback', async () => {
    /**
     * We don't use this pattern in the studio codebase anymore, and we don't recommend using it moving forward.
     * But since it's part of the public API we can't remove it without a major version bump.
     * Thus it makes sense to unit test it to ensure it works as expected and we don't accidentally break backwards compatibility.
     */
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = (props: {open?: true}) => {
      const {open = false} = props
      const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)

      const setElement = useClickOutside(handler, [buttonElement])

      return (
        <>
          <button data-testid="button" ref={setButtonElement} />
          {open && <div data-testid="popover" ref={setElement} />}
          <div data-testid="outside" />
        </>
      )
    }

    const {rerender} = render(<TestComponent />)

    await user.click(screen.getByTestId('button'))
    expect(handler).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)

    // The popover isn't rendered yet
    expect(screen.queryByTestId('popover')).toBeNull()

    // Rerender the component with the popover open
    rerender(<TestComponent open />)

    // Clicking the popover should not trigger the handler
    await user.click(screen.getByTestId('popover'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('instead of `setElement`, update the `elements` array', async () => {
    /**
     * Since we don't want people to use the `setElement` pattern, test that userland can handle dynamically changing elements arrays
     */
    const user = userEvent.setup()
    const handler = jest.fn()

    const TestComponent = (props: {open?: true}) => {
      const {open = false} = props
      const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonElement, popoverElement])

      return (
        <>
          <button data-testid="button" ref={setButtonElement} />
          {open && <div data-testid="popover" ref={setPopoverElement} />}
          <div data-testid="outside" />
        </>
      )
    }

    const {rerender} = render(<TestComponent />)

    await user.click(screen.getByTestId('button'))
    expect(handler).not.toHaveBeenCalled()

    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)

    // The popover isn't rendered yet
    expect(screen.queryByTestId('popover')).toBeNull()

    // Rerender the component with the popover open
    rerender(<TestComponent open />)

    // Clicking the popover should not trigger the handler
    await user.click(screen.getByTestId('popover'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('returning the current value of refs in the elements array is dangerous', async () => {
    /**
     * This test demonstrates why it's dangerous to return ref values in the elements array.
     * When using refs, pass a function returning the elements array, instead of defining the array directly during render
     */

    const user = userEvent.setup()
    let handler = jest.fn()

    /**
     * Using refs in the `useClickOutside` elements array is dangerous,
     * the below example demonstrates how `useClickOutside` doesn't "see" the current values of refs,
     * it can only "see" whatever the value of the ref was when the hook was rendered.
     */
    let TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonRef.current, popoverRef.current])

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={popoverRef} />
        </>
      )
    }
    const {rerender} = render(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    // Because the ref values are stale, the handler is called
    expect(handler).toHaveBeenCalledTimes(2)

    /**
     * If a mixture of refs and state is used it can appear like it's working correctly,
     * but this is a side-effect, not an indication it's safe.
     */
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonRef.current, popoverElement])

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={setPopoverElement} />
          <div data-testid="outside" />
        </>
      )
    }
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)

    /**
     * Unrelated state updates can create the same false impression of safety.
     */
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonRef.current, popoverRef.current])

      const [, tick] = useState(0)
      useEffect(() => {
        /**
         * This effect schedules a re-render, which will lead to `useClickOutsideHandler` "seeing"
         * the current value of the refs after they got assigned dom nodes when the React ref callbacks executed.
         */
        tick((prev) => ++prev)
      }, [])

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={popoverRef} />
          <div data-testid="outside" />
        </>
      )
    }
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)

    /**
     * When using the legacy version of the `useClickOutside` API it's necessary to synchronize mutable ref values
     * with a effect and state loop to ensure they're not stale
     */
    const useElementsFromRefs = (refs: React.MutableRefObject<HTMLElement | null>[]) => {
      const [elements, setElements] = useState(() => refs.map((ref) => ref.current))

      useEffect(() => {
        if (refs.length !== elements.length) {
          setElements(refs.map((ref) => ref.current))
        }
        for (const ref of refs) {
          if (!elements.includes(ref.current)) {
            setElements(refs.map((ref) => ref.current))
            return
          }
        }
      }, [elements, refs])

      return elements
    }
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      const elements = useElementsFromRefs([buttonRef, popoverRef])
      useClickOutside(handler, elements)

      return (
        <>
          <button data-testid="button" ref={buttonRef} />
          <div data-testid="popover" ref={popoverRef} />
          <div data-testid="outside" />
        </>
      )
    }
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('outside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('using the current value of a react ref as the `boundaryElement` is dangerous', async () => {
    /**
     * This test demonstrates why it's dangerous to return a ref value as the boundaryElement,
     * for the same reasons it's dangerous for the elements array.
     */

    const user = userEvent.setup()
    let handler = jest.fn()

    /**
     * Using refs in the `useClickOutside` elements array is dangerous,
     * the below example demonstrates how `useClickOutside` doesn't "see" the current values of refs,
     * it can only "see" whatever the value of the ref was when the hook was rendered.
     */
    let TestComponent = () => {
      const boundaryRef = useRef<HTMLDivElement | null>(null)

      useClickOutside(handler, [], boundaryRef.current)

      return (
        <>
          <div ref={boundaryRef}>
            <div data-testid="inside" />
          </div>
          <div data-testid="outside" />
        </>
      )
    }
    const {rerender} = render(<TestComponent />)
    await user.click(screen.getByTestId('inside'))
    await user.click(screen.getByTestId('outside'))
    // Because the ref values are stale, the handler is called
    expect(handler).toHaveBeenCalledTimes(2)

    /**
     * If a mixture of refs and state is used it can appear like it's working correctly,
     * but this is a side-effect, not an indication it's safe.
     */
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
      const boundaryRef = useRef<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonRef.current, popoverElement], boundaryRef.current)

      return (
        <>
          <div ref={boundaryRef}>
            <button data-testid="button" ref={buttonRef} />
            <div data-testid="popover" ref={setPopoverElement} />
            <div data-testid="inside" />
          </div>
          <div data-testid="outside" />
        </>
      )
    }
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    await user.click(screen.getByTestId('outside'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('inside'))
    expect(handler).toHaveBeenCalledTimes(1)

    /**
     * Unrelated state updates can create the same false impression of safety.
     */
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)
      const boundaryRef = useRef<HTMLDivElement | null>(null)

      useClickOutside(handler, [buttonRef.current, popoverRef.current], boundaryRef.current)

      const [, tick] = useState(0)
      useEffect(() => {
        /**
         * This effect schedules a re-render, which will lead to `useClickOutsideHandler` "seeing"
         * the current value of the refs after they got assigned dom nodes when the React ref callbacks executed.
         */
        tick((prev) => ++prev)
      }, [])

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
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    await user.click(screen.getByTestId('outside'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('inside'))
    expect(handler).toHaveBeenCalledTimes(1)

    /**
     * When using the legacy version of the `useClickOutside` API it's necessary to synchronize mutable ref values
     * with a effect and state loop to ensure they're not stale
     */
    const useBoundaryElementFromRef = (ref: React.MutableRefObject<HTMLElement | null>) => {
      const [element, setElement] = useState(() => ref.current)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => {
        // If the ref has mutated since the last render, update the state and schedule a re-render
        if (ref.current !== element) {
          setElement(ref.current)
        }
      })

      return element
    }
    handler = jest.fn()
    TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)
      const boundaryRef = useRef<HTMLDivElement | null>(null)

      const boundaryElement = useBoundaryElementFromRef(boundaryRef)
      useClickOutside(handler, [buttonRef.current, popoverRef.current], boundaryElement)

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
    rerender(<TestComponent />)
    await user.click(screen.getByTestId('button'))
    await user.click(screen.getByTestId('popover'))
    await user.click(screen.getByTestId('outside'))
    expect(handler).not.toHaveBeenCalled()
    await user.click(screen.getByTestId('inside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
