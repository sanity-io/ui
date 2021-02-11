import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'

export type BoundaryElementContextValue = {
  version: 0.0
  element: HTMLElement | null
}

const key = Symbol.for('@sanity/ui/context/boundaryElement')

globalScope[key] = globalScope[key] || createContext<BoundaryElementContextValue | null>(null)

export const BoundaryElementContext: React.Context<BoundaryElementContextValue | null> =
  globalScope[key]
