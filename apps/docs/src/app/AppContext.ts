'use client'

import {createContext} from 'react'

import {SettingsData} from '@/lib/data'
import {NavNode} from '@/lib/nav'

export interface AppContextValue {
  nav: NavNode | null
  projectId: string | undefined
  settings: SettingsData | null
}

export const AppContext = createContext<AppContextValue | null>(null)
