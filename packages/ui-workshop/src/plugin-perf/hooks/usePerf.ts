import {useContext} from 'react'

import {
  PerfInspectorContext,
  type PerfInspectorContextValue,
  PerfTestContext,
  type PerfTestContextValue,
} from '../PerfContext'

/** @internal */
export function usePerf(): PerfTestContextValue {
  const perf = useContext(PerfTestContext)

  if (!perf) {
    throw new Error('Perf: missing test context value')
  }

  return perf
}

/** @internal */
export function usePerfInspector(): PerfInspectorContextValue {
  const perf = useContext(PerfInspectorContext)

  if (!perf) {
    throw new Error('Perf: missing inspector context value')
  }

  return perf
}
