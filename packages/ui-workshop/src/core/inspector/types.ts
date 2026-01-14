import {ButtonTone} from '@sanity/ui'
import {ReactNode} from 'react'
import {WorkshopPlugin} from '../config'

export interface InspectorTab {
  id: string
  label: ReactNode
  plugin: WorkshopPlugin
  tone?: ButtonTone
}
