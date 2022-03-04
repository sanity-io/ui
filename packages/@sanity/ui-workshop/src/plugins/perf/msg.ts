import {PerfTestRenderResult} from './types'

export interface PerfClearResultsMsg {
  type: 'workshop/perf/clearResults'
  name: string
}

export interface PerfRegisterTestMsg {
  type: 'workshop/perf/registerTest'
  description?: string
  name: string
  title?: string
}

export interface PerfRunTestMsg {
  type: 'workshop/perf/runTest'
  name: string
}

export interface PerfUnregisterTestMsg {
  type: 'workshop/perf/unregisterTest'
  name: string
}

export interface PerfAddResultMsg {
  type: 'workshop/perf/addResult'
  name: string
  result: {
    avgDuration: number
    sumDuration: number
    runs: number
  }
}

export interface PerfAddRenderResultMsg {
  type: 'workshop/perf/addRenderResult'
  name: string
  result: PerfTestRenderResult
}

export type PerfMsg =
  | PerfClearResultsMsg
  | PerfRegisterTestMsg
  | PerfRunTestMsg
  | PerfUnregisterTestMsg
  | PerfAddResultMsg
  | PerfAddRenderResultMsg
