/** @vitest-environment jsdom */

import {render, renderHook} from '@testing-library/react'
import {useLayoutEffect} from 'react'
import {describe, expect, it} from 'vitest'

import {useLatestRef} from './useLatestRef'

describe('useLatestRef', () => {
  it('returns one ref whose value follows the argument', () => {
    const {rerender, result} = renderHook(({value}) => useLatestRef(value), {
      initialProps: {value: 1},
    })
    const ref = result.current

    expect(ref.current).toBe(1)

    rerender({value: 2})

    expect(result.current).toBe(ref)
    expect(ref.current).toBe(2)
  })

  it('is current before the layout effects of the same commit run', () => {
    const seen: number[] = []

    // A child's layout effects run before its parent's, so this one would see the previous value
    // if the hook wrote the ref in a layout effect of its own; it sees the new one because the
    // hook writes it in an insertion effect
    function Reader({refObject, value}: {refObject: React.RefObject<number>; value: number}) {
      useLayoutEffect(() => {
        seen.push(refObject.current)
      }, [refObject, value])

      return null
    }

    function Holder({value}: {value: number}) {
      const ref = useLatestRef(value)

      return <Reader refObject={ref} value={value} />
    }

    const {rerender} = render(<Holder value={1} />)

    rerender(<Holder value={2} />)

    expect(seen).toEqual([1, 2])
  })
})
