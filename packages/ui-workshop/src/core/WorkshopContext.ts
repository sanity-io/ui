import type {ColorScheme} from '@sanity/ui/theme'
import {createContext} from 'react'

import type {WorkshopCollection, WorkshopPlugin, WorkshopScope, WorkshopStory} from './config/types'
import type {Pubsub} from './lib/pubsub'
import type {WorkshopMsg} from './types/msg'

/** @public */
export type WorkshopColorScheme = ColorScheme | 'system'

/** @public */
export interface WorkshopContextValue<CustomMsg = never> {
  plugins: WorkshopPlugin[]
  broadcast: (msg: WorkshopMsg | CustomMsg) => void
  channel: Pubsub<WorkshopMsg | CustomMsg>
  collections: WorkshopCollection[]
  frameReady: boolean
  frameUrl: string
  origin: 'frame' | 'main'
  path: string
  payload: Record<string, unknown>
  scheme: WorkshopColorScheme
  scope: WorkshopScope | null
  scopes: WorkshopScope[]
  story: WorkshopStory | null
  title: string
  viewport: string
  zoom: number
}

/** @internal */
export const WorkshopContext = createContext<WorkshopContextValue | null>(null)
