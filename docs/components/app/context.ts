import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  setColorScheme: (mode: ThemeColorSchemeKey) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
