import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {composeRefs} from './composeRefs'

type Node = {id: string}

const node: Node = {id: 'node'}

describe('composeRefs', () => {
  it('sets ref objects to the node', () => {
    const refA = createRef<Node>()
    const refB = createRef<Node>()

    composeRefs(refA, refB)(node)

    expect(refA.current).toBe(node)
    expect(refB.current).toBe(node)
  })

  it('calls callback refs with the node', () => {
    const callbackA = vi.fn()
    const callbackB = vi.fn()

    composeRefs<Node>(callbackA, callbackB)(node)

    expect(callbackA).toHaveBeenCalledExactlyOnceWith(node)
    expect(callbackB).toHaveBeenCalledExactlyOnceWith(node)
  })

  it('sets ref objects and calls callback refs together', () => {
    const ref = createRef<Node>()
    const callback = vi.fn()

    composeRefs<Node>(ref, callback)(node)

    expect(ref.current).toBe(node)
    expect(callback).toHaveBeenCalledExactlyOnceWith(node)
  })

  it('ignores null and undefined refs', () => {
    const ref = createRef<Node>()

    expect(() => composeRefs<Node>(null, undefined, ref)(node)).not.toThrow()
    expect(ref.current).toBe(node)
  })

  it('returns a cleanup function', () => {
    const cleanup = composeRefs(createRef<Node>())(node)

    expect(cleanup).toBeTypeOf('function')
  })

  it('returns a cleanup function when no refs are given', () => {
    const cleanup = composeRefs<Node>()(node)

    expect(cleanup).toBeTypeOf('function')
    expect(() => (cleanup as () => void)()).not.toThrow()
  })

  describe('cleanup', () => {
    it('sets ref objects to null', () => {
      const ref = createRef<Node>()
      const cleanup = composeRefs(ref)(node) as () => void

      cleanup()

      expect(ref.current).toBeNull()
    })

    it('calls callback refs with null if they do not return a cleanup function', () => {
      const callback = vi.fn()
      const cleanup = composeRefs<Node>(callback)(node) as () => void

      cleanup()

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenLastCalledWith(null)
    })

    it('calls the cleanup function of a callback ref in place of calling the ref with null', () => {
      const callbackCleanup = vi.fn()
      const callback = vi.fn(() => callbackCleanup)
      const cleanup = composeRefs<Node>(callback)(node) as () => void

      cleanup()

      expect(callbackCleanup).toHaveBeenCalledOnce()
      expect(callback).toHaveBeenCalledExactlyOnceWith(node)
    })

    it('handles a mix of ref objects, callback refs, and callback refs with cleanup functions', () => {
      const ref = createRef<Node>()
      const callback = vi.fn()
      const callbackCleanup = vi.fn()
      const callbackWithCleanup = vi.fn(() => callbackCleanup)

      const cleanup = composeRefs<Node>(
        ref,
        callback,
        callbackWithCleanup,
        null,
      )(node) as () => void
      cleanup()

      expect(ref.current).toBeNull()
      expect(callback).toHaveBeenLastCalledWith(null)
      expect(callbackCleanup).toHaveBeenCalledOnce()
      expect(callbackWithCleanup).toHaveBeenCalledExactlyOnceWith(node)
    })

    it('runs cleanups in the same order as the refs', () => {
      const calls: string[] = []
      const callbackA = () => () => {
        calls.push('a')
      }
      const callbackB = (value: Node | null) => {
        if (value === null) calls.push('b')
      }
      const callbackC = () => () => {
        calls.push('c')
      }

      const cleanup = composeRefs<Node>(callbackA, callbackB, callbackC)(node) as () => void
      cleanup()

      expect(calls).toEqual(['a', 'b', 'c'])
    })
  })
})
