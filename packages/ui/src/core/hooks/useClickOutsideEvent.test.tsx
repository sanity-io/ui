/** @vitest-environment jsdom */

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// oxlint-disable-next-line no-restricted-imports -- this test deliberately renders a `forwardRef` component (consumers may still use it on React 19) to pin the freshness contract below
import {forwardRef, memo, useRef} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {useClickOutsideEvent} from './useClickOutsideEvent'

describe('useClickOutsideEvent', () => {
  /**
   * This suite demonstrates the new hook `useClickOutsideEvent` that replaces `useClickOutside`
   */

  it('calls the handler when clicking outside of the array of elements', async () => {
    const user = userEvent.setup()
    const handler = vi.fn()

    const TestComponent = () => {
      const buttonRef = useRef<HTMLButtonElement | null>(null)
      const popoverRef = useRef<HTMLDivElement | null>(null)

      useClickOutsideEvent(handler, () => [buttonRef.current, popoverRef.current])

      return (
        <>
          {/* oxlint-disable-next-line control-has-associated-label */}
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
    const handler = vi.fn()

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
          {/* oxlint-disable-next-line control-has-associated-label */}
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
    const handler = vi.fn()

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
            {/* oxlint-disable-next-line control-has-associated-label */}
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

  /**
   * The listener must always see the latest props/state, no matter what kind of component calls
   * the hook. React's native `useEffectEvent` fails this in `forwardRef` and `memo` components
   * on React 19.2 (https://github.com/facebook/react/issues/34818), which is why the hook
   * uses `use-effect-event` instead — this test guards against switching to the native hook
   * before the upstream fix ships.
   */
  it('the listener sees the latest props in forwardRef and memo components', async () => {
    const user = userEvent.setup()
    const seen: string[] = []

    function useProbe(label: string, n: number) {
      const elementRef = useRef<HTMLDivElement | null>(null)

      useClickOutsideEvent(
        () => {
          seen.push(`${label}:${n}`)
        },
        () => [elementRef.current],
      )

      return elementRef
    }

    const ForwardRefComp = forwardRef<HTMLDivElement, {n: number}>(function ForwardRefComp(
      {n},
      ref,
    ) {
      const elementRef = useProbe('forwardRef', n)

      return (
        <div ref={ref}>
          <div ref={elementRef} />
        </div>
      )
    })

    const MemoComp = memo(function MemoComp({n}: {n: number}) {
      const elementRef = useProbe('memo', n)

      return <div ref={elementRef} />
    })

    const {rerender} = render(
      <>
        <ForwardRefComp n={0} />
        <MemoComp n={0} />
        <div data-testid="outside" />
      </>,
    )

    rerender(
      <>
        <ForwardRefComp n={1} />
        <MemoComp n={1} />
        <div data-testid="outside" />
      </>,
    )

    await user.click(screen.getByTestId('outside'))
    expect(seen).toEqual(['forwardRef:1', 'memo:1'])
  })
})
