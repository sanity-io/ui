import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {LayerContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/layer')

export const LayerContext = createGlobalScopedContext<LayerContextValue | null>(key, null)
