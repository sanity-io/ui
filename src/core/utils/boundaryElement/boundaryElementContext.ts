import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {BoundaryElementContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/boundaryElement')

export const BoundaryElementContext = createGlobalScopedContext<BoundaryElementContextValue | null>(
  key,
  null,
)
