import {memo, Profiler, useCallback, useEffect, useMemo, useRef} from 'react'

import {PerfTest, PerfTestRenderResult, PerfTestRunFn} from '../types'
import {usePerf} from './usePerf'

/** @beta */
export interface PerfTestHookProps<TargetType = unknown> {
  ref: React.MutableRefObject<TargetType | null>
  Wrapper: React.ElementType<{children?: React.ReactNode}>
}

/** @beta */
export interface PerfTestProps<TargetType = unknown> {
  description?: string
  name: string
  run: PerfTestRunFn<TargetType>
  title?: string
}

/** @beta */
export function usePerfTest<TargetType = unknown>(
  props: PerfTestProps<TargetType>,
): PerfTestHookProps<TargetType> {
  const {name, title, description, run} = props

  const {activeTest, addRenderResult, registerTest} = usePerf()
  const active = activeTest === name

  const ref = useRef<TargetType | null>(null)

  const test: PerfTest<TargetType> = useMemo(
    () => ({description, name, ref, run, title}),
    [description, name, ref, run, title],
  )

  const handleRender: React.ProfilerOnRenderCallback = useCallback(
    (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      const result: PerfTestRenderResult = {
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: new Set(),
      }

      setTimeout(() => {
        // eslint-disable-next-line
        console.log('@todo: render', {addRenderResult, name, result})

        // @todo: this causes an infinite render-loop – why???
        // addRenderResult(name, result)
      }, 0)
    },
    [addRenderResult, name],
  )

  const Wrapper = useMemo(() => {
    return memo(
      // eslint-disable-next-line no-shadow
      function Wrapper({children}: {children?: React.ReactNode}): React.ReactElement {
        if (!active) {
          return <>{children}</>
        }

        return (
          <Profiler id={name} onRender={handleRender}>
            {children}
          </Profiler>
        )
      },
    )
  }, [active, handleRender, name])

  useEffect(() => registerTest(test as PerfTest<unknown>), [registerTest, test])

  return useMemo(() => ({ref, Wrapper}), [ref, Wrapper])
}
