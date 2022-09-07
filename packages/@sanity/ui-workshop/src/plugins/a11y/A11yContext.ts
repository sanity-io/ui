import {AxeResults} from 'axe-core'
import {createContext} from 'react'

/** @internal */
export interface A11yContextValue {
  error: {message: string} | null
  results: AxeResults | null
}

/** @internal */
export const A11yContext = createContext<A11yContextValue | null>(null)
