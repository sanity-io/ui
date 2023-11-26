import {createContext} from 'react'

import {PerfTest, PerfTestDetail, PerfTestRenderResult, PerfTestResult} from './types'

/** @internal */
export interface PerfContextValue {
  activeTest?: string
  addRenderResult: (testName: string, result: PerfTestRenderResult) => void
  clearResults: (testName: string) => void
  registerTest: (test: PerfTest) => () => void
  results: PerfTestResult[]
  runTest: (testName: string) => void
  testDetails: PerfTestDetail[]
  tests: PerfTest[]
}

/** @internal */
export const PerfContext = createContext<PerfContextValue | null>(null)
