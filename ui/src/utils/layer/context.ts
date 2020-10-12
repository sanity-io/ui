import {createContext} from 'react'

export interface LayerContextValue {
  depth: number
  isTopLayer: boolean
  mount: () => () => void
  size: number
}

export const LayerContext = createContext<LayerContextValue | null>(null)
