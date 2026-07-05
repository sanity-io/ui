/** @vitest-environment jsdom */

import {act, renderHook} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

import {useDelayedState} from './useDelayedState'

describe('useDelayedState', () => {
  it('should update state immediately if delay is not provided', () => {
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true)
    })
    expect(result.current[0]).toBe(true)
  })

  it('should update state after delay if delay is provided', async () => {
    vi.useFakeTimers()
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true, 1000)
    })
    expect(result.current[0]).toBe(false)
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current[0]).toBe(false)

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current[0]).toBe(true)
  })

  it('should update state with callback function', () => {
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState((prev: boolean) => !prev)
    })

    expect(result.current[0]).toBe(true)
  })

  it('should clear pending timeout on unmount', () => {
    vi.useFakeTimers()
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    const {result, unmount} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true, 1000)
    })

    clearTimeoutSpy.mockClear()

    // Unmount while the delayed update is still pending
    unmount()

    // clearTimeout should have been called during cleanup
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1)
    clearTimeoutSpy.mockRestore()
  })

  it('should cancel update if the set state was called with a new state', () => {
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true, 1000)
    })
    expect(result.current[0]).toBe(false)

    vi.advanceTimersByTime(500)

    act(() => {
      setState(false)
    })
    vi.advanceTimersByTime(600)
    // Even after 1.1 seconds, the state should continue being false, because it was cancelled by a next setState call
    expect(result.current[0]).toBe(false)
  })
})
