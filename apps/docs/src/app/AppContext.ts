'use client'

import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {createContext} from 'react'

import {SettingsData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

export interface AppContextValue {
  colorScheme: ThemeColorSchemeKey | 'system'
  dataset: string | undefined
  features: {
    hintHiddenContent: boolean
  }
  imageUrlBuilder: ImageUrlBuilder
  nav: NavNode | null
  projectId: string | undefined
  setColorScheme: (scheme: ThemeColorSchemeKey | 'system') => void
  settings: SettingsData | null
}

export const AppContext = createContext<AppContextValue | null>(null)
