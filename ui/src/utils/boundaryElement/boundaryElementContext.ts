import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export type BoundaryElementContextValue = HTMLElement

const key = Symbol.for('@sanity/ui/context/boundaryElement')

globalScope[key] = globalScope[key] || createContext<BoundaryElementContextValue | null>(null)

export const BoundaryElementContext: React.Context<BoundaryElementContextValue | null> =
  globalScope[key]
