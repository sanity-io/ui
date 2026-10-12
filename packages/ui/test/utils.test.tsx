/** @vitest-environment jsdom */

import {screen} from '@testing-library/react'
import {useEffect, useLayoutEffect} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {render} from './utils'

/**
 * Counts how often React invokes each lifecycle hook of a component. StrictMode's simulated
 * unmount and remount runs every mount effect's setup, cleanup and setup again, and attaches,
 * detaches and reattaches refs; without it everything runs once.
 */
function createProbe() {
  const calls = {
    effect: vi.fn(),
    effectCleanup: vi.fn(),
    layoutEffect: vi.fn(),
    layoutCleanup: vi.fn(),
    render: vi.fn(),
  }
  // A callback ref, called with the element on attach and `null` on detach
  const attachElement = vi.fn<(element: HTMLDivElement | null) => void>()

  function Probe() {
    calls.render()

    useLayoutEffect(() => {
      calls.layoutEffect()

      return () => {
        calls.layoutCleanup()
      }
    }, [])

    useEffect(() => {
      calls.effect()

      return () => {
        calls.effectCleanup()
      }
    }, [])

    return <div data-testid="probe" ref={attachElement} />
  }

  return {attachElement, calls, Probe}
}

describe('render', () => {
  it('renders under StrictMode by default, so mount effects and refs go through the simulated unmount and remount', () => {
    const {attachElement, calls, Probe} = createProbe()

    render(<Probe />)
    const element = screen.getByTestId('probe')

    expect(calls.render).toHaveBeenCalledTimes(2)

    expect(calls.layoutEffect).toHaveBeenCalledTimes(2)
    expect(calls.layoutCleanup).toHaveBeenCalledTimes(1)
    expect(calls.effect).toHaveBeenCalledTimes(2)
    expect(calls.effectCleanup).toHaveBeenCalledTimes(1)

    // Attached, detached, attached again. (Only the first argument is compared: the development
    // build detaches through `runWithFiberInDEV`, which forwards its unused argument slots.)
    expect(attachElement.mock.calls.map(([node]) => node)).toEqual([element, null, element])
  })

  it('runs everything once with `strict: false`', () => {
    const {attachElement, calls, Probe} = createProbe()

    render(<Probe />, {strict: false})
    const element = screen.getByTestId('probe')

    expect(calls.render).toHaveBeenCalledTimes(1)

    expect(calls.layoutEffect).toHaveBeenCalledTimes(1)
    expect(calls.layoutCleanup).not.toHaveBeenCalled()
    expect(calls.effect).toHaveBeenCalledTimes(1)
    expect(calls.effectCleanup).not.toHaveBeenCalled()

    expect(attachElement.mock.calls.map(([node]) => node)).toEqual([element])
  })

  it('keeps the `wrapper` option around the theme provider and card', () => {
    function Wrapper({children}: {children?: React.ReactNode}) {
      return <section data-testid="wrapper">{children}</section>
    }

    render(<span data-testid="content">content</span>, {wrapper: Wrapper})

    const wrapper = screen.getByTestId('wrapper')
    const card = wrapper.querySelector('[data-ui="Card"]')

    expect(card).not.toBeNull()
    expect(card).toContainElement(screen.getByTestId('content'))
  })
})
