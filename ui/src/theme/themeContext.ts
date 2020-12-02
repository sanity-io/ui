import {createContext} from 'react'
import {ThemeColorName, ThemeColorSchemeKey} from './lib'
import {RootTheme} from './types'

export interface ThemeContextValue {
  theme: RootTheme
  variant: ThemeColorName
  scheme: ThemeColorSchemeKey
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
