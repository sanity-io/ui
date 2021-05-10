import {createContext} from 'react'
import {ScopeContextValue} from './types'

export const ScopeContext = createContext<ScopeContextValue | null>(null)
