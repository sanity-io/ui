/** @beta */
export type PerfTestRunFn<TargetType = unknown> = (context: {
  target: TargetType
}) => Promise<void> | void

/** @internal */
export interface PerfTest<TargetType = unknown> {
  description?: string
  name: string
  title?: string
  ref: React.MutableRefObject<TargetType | null>
  run: PerfTestRunFn<TargetType>
}

/** @internal */
export interface PerfTestResult {
  name: string
  renders: PerfTestRenderResult[]
  timing?: {
    avgDuration: number
    sumDuration: number
    runs: number
  }
}

/** @internal */
export interface PerfTestDetail {
  description?: string
  name: string
  title?: string
}

/**
 * @see React.ProfilerOnRenderCallback
 * @internal
 */
export interface PerfTestRenderResult {
  id: string
  phase: 'mount' | 'update' | 'nested-update'
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
  /** @deprecated - this will be removed in the next major version */
  interactions: Set<{
    __count: number
    id: number
    name: string
    timestamp: number
  }>
}

/** @internal */
export interface PerfState {
  results: PerfTestResult[]
  activeTest?: string
  testDetails: PerfTestDetail[]
  tests: PerfTest[]
}
