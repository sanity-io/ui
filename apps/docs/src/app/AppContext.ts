'use client'

import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {createContext} from 'react'

import {SettingsData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

export interface AppContextValue {
  basePath?: string
  colorScheme: ThemeColorSchemeKey | 'system'
  dataset: string | undefined
  features: {
    hintHiddenContent: boolean
  }
  imageUrlBuilder: ImageUrlBuilder
  nav: NavNode | null
  setColorScheme: (scheme: ThemeColorSchemeKey | 'system') => void
  settings: WrappedValue<SettingsData> | null
}

export const AppContext = createContext<AppContextValue | null>(null)
