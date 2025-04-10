import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {BoundaryElementContextValue} from './types'

export const BoundaryElementContext = createGlobalScopedContext<BoundaryElementContextValue | null>(
  '@sanity/ui/context/boundaryElement',
  null,
)
