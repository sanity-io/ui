import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {LayerContextValue} from './types'

export const LayerContext = createGlobalScopedContext<LayerContextValue | null>(
  '@sanity/ui/context/layer',
  null,
)
