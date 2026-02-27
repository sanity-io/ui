import type {ElementTone} from '@sanity/ui/tokens'

import type {WorkshopPlugin} from '../config/types'

export interface InspectorTab {
  id: string
  label: React.ReactNode
  plugin: WorkshopPlugin
  tone?: ElementTone
}
