'use client'

import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {createContext} from 'react'

export const ColorSchemeContext = createContext<ThemeColorSchemeKey>('light')
