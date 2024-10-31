import {createContext} from 'react'

export const RootCardContext = createContext<{renderedVars: boolean} | null>(null)
