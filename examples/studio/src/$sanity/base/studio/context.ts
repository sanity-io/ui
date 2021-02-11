import {createContext} from 'react'
import {StudioCommand} from './types'

export interface StudioContextValue {
  commands: StudioCommand[]
  dataset: string
  projectId: string
}

export const StudioContext = createContext<StudioContextValue | null>(null)
