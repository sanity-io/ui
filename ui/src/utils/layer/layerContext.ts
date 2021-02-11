import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export interface LayerContextValue {
  version: 0.0
  isTopLayer: boolean
  registerChild: () => () => void
  size: number
  zIndex: number
}

const key = Symbol.for('@sanity/ui/context/layer')

globalScope[key] = globalScope[key] || createContext<LayerContextValue | null>(null)

export const LayerContext: React.Context<LayerContextValue | null> = globalScope[key]
