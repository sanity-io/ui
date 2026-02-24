import {createContext} from 'react'

import type {PerfTest, PerfTestDetail, PerfTestRenderResult, PerfTestResult} from './types'

/** @internal */
export interface PerfTestContextValue {
  activeTest?: string
  addRenderResult: (testName: string, result: PerfTestRenderResult) => void
  registerTest: (test: PerfTest) => () => void
}

/** @internal */
export interface PerfInspectorContextValue {
  clearResults: (testName: string) => void
  results: PerfTestResult[]
  runTest: (testName: string) => void
  testDetails: PerfTestDetail[]
}

/** @internal */
export const PerfTestContext = createContext<PerfTestContextValue | null>(null)

/** @internal */
export const PerfInspectorContext = createContext<PerfInspectorContextValue | null>(null)
