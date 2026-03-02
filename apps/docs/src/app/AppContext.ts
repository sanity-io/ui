'use client'

import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {ColorScheme} from '@sanity/ui/theme'
import {createContext} from 'react'

import {SettingsData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

export interface AppContextValue {
  basePath?: string
  colorScheme: ColorScheme | 'system'
  dataset: string | undefined
  features: {
    hintHiddenContent: boolean
  }
  imageUrlBuilder: ImageUrlBuilder
  nav: NavNode | null
  setColorScheme: (scheme: ColorScheme | 'system') => void
  settings: WrappedValue<SettingsData> | null
}

export const AppContext = createContext<AppContextValue | null>(null)
