import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'
import {Pubsub} from './lib/pubsub'
import {
  WorkshopPlugin,
  WorkshopCollection,
  WorkshopMsg,
  WorkshopScope,
  WorkshopStory,
} from './types'

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
  scheme: ThemeColorSchemeKey
  scope: WorkshopScope | null
  scopes: WorkshopScope[]
  story: WorkshopStory | null
  title: string
  viewport: string
  zoom: number
}

export const WorkshopContext = createContext<WorkshopContextValue | null>(null)
