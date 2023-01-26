import {Context, createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {LayerContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/layer')

globalScope[key] = globalScope[key] || createContext<LayerContextValue | null>(null)

export const LayerContext: Context<LayerContextValue | null> = globalScope[key]
