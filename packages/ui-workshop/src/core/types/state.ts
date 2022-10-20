import {ThemeColorSchemeKey} from '@sanity/ui'

/** @public */
export interface WorkshopState {
  frameReady: boolean
  path: string
  payload: Record<string, unknown>
  scheme: ThemeColorSchemeKey
  viewport: string
  zoom: number
}
