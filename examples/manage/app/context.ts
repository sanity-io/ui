import {createContext} from 'react'

export interface AppContextValue {
  setThemeMode: (mode: 'dark' | 'light') => void
  themeMode: 'dark' | 'light'
}

export const AppContext = createContext<AppContextValue | null>(null)
