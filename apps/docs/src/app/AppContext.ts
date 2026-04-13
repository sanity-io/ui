'use client'

import {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {ColorScheme} from '@sanity/ui/theme'
import {createContext} from 'react'

import {SettingsData} from '@/lib/data'
import {NavNode} from '@/lib/nav'
import {ClientPerspective} from 'next-sanity'
import {AppEnv} from './types'

export interface AppContextValue {
  basePath?: string
  colorScheme: ColorScheme | 'system'
  dataset: string
  env: AppEnv
  features: {
    hintHiddenContent: boolean
  }
  imageUrlBuilder: ImageUrlBuilder
  nav: NavNode | null
  perspective: ClientPerspective | undefined
  projectId: string
  setColorScheme: (scheme: ColorScheme | 'system') => void
  settings: WrappedValue<SettingsData> | null
  studioBaseUrl: string
}

export const AppContext = createContext<AppContextValue | null>(null)
