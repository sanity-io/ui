/** @vitest-environment jsdom */

import {describe, expect, it, vi} from 'vitest'

import {attachRef} from './attachRef'

describe('attachRef', () => {
  const value = document.createElement('div')

  it('sets and clears a ref object', () => {
    const ref = {current: null as HTMLElement | null}

    const detach = attachRef(ref, value)

    expect(ref.current).toBe(value)

    detach()

    expect(ref.current).toBeNull()
  })

  it('calls a callback ref with the value, and with `null` to detach when it returned no cleanup', () => {
    const callbackRef = vi.fn()

    const detach = attachRef(callbackRef, value)

    expect(callbackRef.mock.calls).toEqual([[value]])

    detach()

    expect(callbackRef.mock.calls).toEqual([[value], [null]])
  })

  it('calls the cleanup a callback ref returned to detach, instead of the ref with `null`', () => {
    const cleanup = vi.fn()
    const callbackRef = vi.fn(() => cleanup)

    const detach = attachRef(callbackRef, value)

    expect(cleanup).not.toHaveBeenCalled()

    detach()

    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(callbackRef.mock.calls).toEqual([[value]])
  })

  it('treats a return value of a callback ref that is not a function like no cleanup', () => {
    // A callback ref written as a one-liner, `ref={(el) => (this.el = el)}`, returns the element;
    // the types rule that out, the runtime does not
    const callbackRef = vi.fn((node: HTMLElement | null) => node)

    // oxlint-disable-next-line no-unsafe-type-assertion -- a callback ref returning a value is a runtime case the types exclude
    const detach = attachRef(callbackRef as unknown as React.RefCallback<HTMLElement>, value)

    detach()

    expect(callbackRef.mock.calls).toEqual([[value], [null]])
  })

  it('does nothing without a ref', () => {
    expect(() => attachRef(undefined, value)()).not.toThrow()
    expect(() => attachRef(null, value)()).not.toThrow()
  })
})
