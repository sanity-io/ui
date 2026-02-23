import type {ColorScheme} from '@sanity/ui/theme'

import type {WorkshopQuery} from './location'

/** @public */
export type WorkshopPayload = Record<string, string | number | boolean | WorkshopQuery | undefined>

/** @public */
export interface WorkshopState {
  context: 'frame' | 'main'
  frameReady: boolean
  path: string
  payload: WorkshopPayload
  scheme: ColorScheme
  viewport: string
  zoom: number
}
