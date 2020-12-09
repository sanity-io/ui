import {createContext} from 'react'

export interface LayerContextValue {
  isTopLayer: boolean
  registerChild: () => () => void
  size: number
  zIndex: number
}

export const LayerContext = createContext<LayerContextValue | null>(null)
