import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'
import {AppFeatures} from './types'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  features: AppFeatures
  setColorScheme: (mode: ThemeColorSchemeKey) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
