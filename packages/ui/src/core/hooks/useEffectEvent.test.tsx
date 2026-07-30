// @vitest-environment jsdom
import {render} from '@testing-library/react'
import {act, forwardRef, memo, useEffect, useState} from 'react'
import {describe, expect, test} from 'vitest'

import {useEffectEvent} from './useEffectEvent'

/**
 * React's native `useEffectEvent` fails this test in `forwardRef` and `memo`
 * components on React 19.2 (https://github.com/facebook/react/issues/34818):
 * the effect event keeps seeing first-render values forever.
 */
describe('useEffectEvent', () => {
  test('sees the latest props in plain, forwardRef and memo components', () => {
    const calls: Record<string, () => void> = {}
    const seen: string[] = []

    function usePush(label: string, n: number) {
      const handle = useEffectEvent(() => {
        seen.push(`${label}:${n}`)
      })

      useEffect(() => {
        calls[label] = () => handle()
      }, [label])
    }

    function Plain({n}: {n: number}) {
      usePush('plain', n)
      return null
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

    let bump: (() => void) | undefined

    function App() {
      const [n, setN] = useState(0)

      bump = () => setN((x) => x + 1)

      return (
        <>
          <Plain n={n} />
          <ForwardRefComp n={n} />
          <MemoComp n={n} />
        </>
      )
    }

    render(<App />)

    act(() => bump!())

    calls['plain']!()
    calls['forwardRef']!()
    calls['memo']!()

    expect(seen).toEqual(['plain:1', 'forwardRef:1', 'memo:1'])
  })
})
