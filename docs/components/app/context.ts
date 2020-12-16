import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  nav: unknown
  node: Record<string, unknown> | unknown
  setColorScheme: (mode: ThemeColorSchemeKey) => void
  target: unknown
}

export const AppContext = createContext<AppContextValue | null>(null)
