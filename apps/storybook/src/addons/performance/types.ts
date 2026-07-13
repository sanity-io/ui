import type {ComponentType} from 'react'

export type ProfilerSlot = 'primary' | 'compare'

export interface ProfilerMeasurement {
  actualDuration: number
  baseDuration: number
  commitTime: number
  id: string
  phase: string
  slot: ProfilerSlot
  startTime: number
}

export interface PerformanceParameters {
  compareComponent?: ComponentType<Record<string, unknown>>
  component?: ComponentType<Record<string, unknown>>
}
