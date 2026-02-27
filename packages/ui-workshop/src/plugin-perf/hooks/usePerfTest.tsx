import {Profiler, useCallback, useEffect, useMemo, useRef} from 'react'

import type {PerfTest, PerfTestRenderResult, PerfTestRunFn} from '../types'
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
      // Only track mount and update phases, skip nested-update to prevent infinite loops
      if (phase === 'nested-update') {
        return
      }

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
        addRenderResult(name, result)
      }, 0)
    },
    [addRenderResult, name],
  )

  const Wrapper = useMemo(() => {
    return function Wrapper({children}: {children?: React.ReactNode}) {
      if (!active) {
        return <>{children}</>
      }

      return (
        <Profiler id={name} onRender={handleRender}>
          {children}
        </Profiler>
      )
    }
  }, [active, handleRender, name])

  useEffect(() => registerTest(test as PerfTest<unknown>), [registerTest, test])

  return useMemo(() => ({ref, Wrapper}), [ref, Wrapper])
}
