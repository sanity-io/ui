import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'
import {AppFeatures} from './types'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  features: AppFeatures
  nav: any
  node: any
  setColorScheme: (mode: ThemeColorSchemeKey) => void
  target: any
}

export const AppContext = createContext<AppContextValue | null>(null)
