export type PerfTestRunFn<TargetType = unknown> = (context: {
  target: TargetType
}) => Promise<void> | void

export interface PerfTest<TargetType = unknown> {
  description?: string
  name: string
  title?: string
  ref: React.MutableRefObject<TargetType | null>
  run: PerfTestRunFn<TargetType>
}

export interface PerfTestResult {
  name: string
  renders: PerfTestRenderResult[]
  timing?: {
    avgDuration: number
    sumDuration: number
    runs: number
  }
}

export interface PerfTestDetail {
  description?: string
  name: string
  title?: string
}

/**
 * @see React.ProfilerOnRenderCallback
 */
export interface PerfTestRenderResult {
  id: string
  phase: 'mount' | 'update'
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
  interactions: Set<{
    __count: number
    id: number
    name: string
    timestamp: number
  }>
}

export interface PerfState {
  results: PerfTestResult[]
  activeTest?: string
  testDetails: PerfTestDetail[]
  tests: PerfTest[]
}
