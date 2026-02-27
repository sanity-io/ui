import type {ColorScheme} from '@sanity/ui/theme'

/** @public */
export interface WorkshopState {
  frameReady: boolean
  path: string
  payload: Record<string, unknown>
  scheme: ColorScheme
  viewport: string
  zoom: number
}
