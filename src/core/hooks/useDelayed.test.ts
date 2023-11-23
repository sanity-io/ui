/** @jest-environment jsdom */

import {renderHook, act} from '@testing-library/react'
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
    jest.useFakeTimers()
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true, 1000)
    })
    expect(result.current[0]).toBe(false)
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current[0]).toBe(false)

    act(() => {
      jest.advanceTimersByTime(500)
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

  it('should cancel update if the set state was called with a new state', () => {
    const {result} = renderHook(() => useDelayedState(false))
    const [, setState] = result.current

    act(() => {
      setState(true, 1000)
    })
    expect(result.current[0]).toBe(false)

    jest.advanceTimersByTime(500)

    act(() => {
      setState(false)
    })
    jest.advanceTimersByTime(600)
    // Even after 1.1 seconds, the state should continue being false, because it was cancelled by a next setState call
    expect(result.current[0]).toBe(false)
  })
})
