import {PerfTestRenderResult} from './types'

/** @internal */
export interface PerfClearResultsMsg {
  type: 'workshop/perf/clearResults'
  name: string
}

/** @internal */
export interface PerfRegisterTestMsg {
  type: 'workshop/perf/registerTest'
  description?: string
  name: string
  title?: string
}

/** @internal */
export interface PerfRunTestMsg {
  type: 'workshop/perf/runTest'
  name: string
}

/** @internal */
export interface PerfUnregisterTestMsg {
  type: 'workshop/perf/unregisterTest'
  name: string
}

/** @internal */
export interface PerfAddResultMsg {
  type: 'workshop/perf/addResult'
  name: string
  result: {
    avgDuration: number
    sumDuration: number
    runs: number
  }
}

/** @internal */
export interface PerfAddRenderResultMsg {
  type: 'workshop/perf/addRenderResult'
  name: string
  result: PerfTestRenderResult
}

/** @internal */
export type PerfMsg =
  | PerfClearResultsMsg
  | PerfRegisterTestMsg
  | PerfRunTestMsg
  | PerfUnregisterTestMsg
  | PerfAddResultMsg
  | PerfAddRenderResultMsg
