import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'
import {NavMenu} from '$lib/nav'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  menu: NavMenu | null
  nav: unknown
  setColorScheme: (mode: ThemeColorSchemeKey) => void
  settings: unknown
  target: unknown
}

export const AppContext = createContext<AppContextValue | null>(null)
