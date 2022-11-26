import {ButtonTone} from '@sanity/ui'
import {ElementType, ReactNode} from 'react'

export interface InspectorTab {
  id: string
  label: ReactNode
  panel?: ElementType
  tone?: ButtonTone
}
