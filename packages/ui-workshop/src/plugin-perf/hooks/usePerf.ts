import {useContext} from 'react'

import {PerfContext, type PerfContextValue} from '../PerfContext'

/** @internal */
export function usePerf(): PerfContextValue {
  const perf = useContext(PerfContext)

  if (!perf) {
    throw new Error('Perf: missing context value')
  }

  return perf
}
