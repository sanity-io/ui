// @vitest-environment jsdom
import {act, render} from '@testing-library/react'
import {forwardRef, memo} from 'react'
import {describe, expect, test} from 'vitest'

import {useGlobalKeyDown} from './useGlobalKeyDown'

/**
 * The keydown handler must always see the latest props/state, no matter what
 * kind of component calls the hook. React's native `useEffectEvent` fails
 * this in `forwardRef` and `memo` components on React 19.2
 * (https://github.com/facebook/react/issues/34818), which is why the hook
 * uses `use-effect-event` instead — this test guards against switching to the
 * native hook before the upstream fix ships.
 */
describe('useGlobalKeyDown', () => {
  test('handler sees the latest props in forwardRef and memo components', () => {
    const seen: string[] = []

    function usePush(label: string, n: number) {
      useGlobalKeyDown((event) => {
        seen.push(`${label}:${n}:${event.key}`)
      })
    }

    const ForwardRefComp = forwardRef<HTMLDivElement, {n: number}>(
      function ForwardRefComp({n}, ref) {
        usePush('forwardRef', n)
        return <div ref={ref} />
      },
    )

    const MemoComp = memo(function MemoComp({n}: {n: number}) {
      usePush('memo', n)
      return null
    })

    const {rerender} = render(
      <>
        <ForwardRefComp n={0} />
        <MemoComp n={0} />
      </>,
    )

    rerender(
      <>
        <ForwardRefComp n={1} />
        <MemoComp n={1} />
      </>,
    )

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))
    })

    expect(seen).toEqual(['forwardRef:1:Escape', 'memo:1:Escape'])
  })
})
