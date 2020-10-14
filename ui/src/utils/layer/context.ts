import {createContext} from 'react'

export interface LayerContextValue {
  currentId: string
  depth: number
  isTopLayer: boolean
  mount: (id: string) => () => void
  size: number
}

export const LayerContext = createContext<LayerContextValue | null>(null)
