import type {WorkshopQuery} from './location'
import type {WorkshopColorScheme} from './scheme'

/** @public */
export type WorkshopPayload = Record<string, string | number | boolean | WorkshopQuery | undefined>

/** @public */
export interface WorkshopState {
  context: 'frame' | 'main'
  frameReady: boolean
  path: string
  payload: WorkshopPayload
  scheme: WorkshopColorScheme
  viewport: string
  zoom: number
}
