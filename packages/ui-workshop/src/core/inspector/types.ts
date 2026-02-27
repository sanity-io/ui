import type {ButtonTone} from '@sanity/ui'

import type {WorkshopPlugin} from '../config/types'

export interface InspectorTab {
  id: string
  label: React.ReactNode
  plugin: WorkshopPlugin
  tone?: ButtonTone
}
