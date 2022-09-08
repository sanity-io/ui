import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'
import {NavMenu} from '../../lib/nav'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey
  data: unknown
  loading: boolean
  menu?: NavMenu
  params: Record<string, any>
  setColorScheme: (mode: ThemeColorSchemeKey) => void
  zOffsets: {
    navDrawer: number
    toast: number
  }
}

export const AppContext = createContext<AppContextValue | null>(null)
