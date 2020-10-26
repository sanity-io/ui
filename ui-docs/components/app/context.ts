import {ColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'

export interface AppContextValue {
  colorScheme: ColorSchemeKey
  setColorScheme: (mode: ColorSchemeKey) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
