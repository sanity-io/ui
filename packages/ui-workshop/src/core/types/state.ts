import type {WorkshopColorScheme} from './scheme'

/** @public */
export interface WorkshopState {
  frameReady: boolean
  path: string
  payload: Record<string, unknown>
  scheme: WorkshopColorScheme
  viewport: string
  zoom: number
}
