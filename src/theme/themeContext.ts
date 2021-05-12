import {createContext} from 'react'
import {globalScope} from '../lib/globalScope'
import {ThemeColorName, ThemeColorSchemeKey} from './lib/theme'
import {RootTheme} from './types'

export interface ThemeContextValue {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: RootTheme
  tone: ThemeColorName
}

const key = Symbol.for('@sanity/ui/context/theme')

globalScope[key] = globalScope[key] || createContext<ThemeContextValue | null>(null)

export const ThemeContext: React.Context<ThemeContextValue | null> = globalScope[key]
