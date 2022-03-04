import {AxeResults} from 'axe-core'
import {createContext} from 'react'

export interface A11yContextValue {
  error: {message: string} | null
  results: AxeResults | null
}

export const A11yContext = createContext<A11yContextValue | null>(null)
