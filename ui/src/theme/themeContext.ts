import {createContext} from 'react'
import {ThemeColorName, ThemeColorSchemeKey} from './lib'
import {RootTheme} from './types'

export interface ThemeContextValue {
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
