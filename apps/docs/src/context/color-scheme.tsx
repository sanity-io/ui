'use client'

import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {createContext, use} from 'react'

import type {ColorSchemePreference} from '#lib/color-scheme.ts'

export interface ColorSchemeContextValue {
  /** Resolved scheme passed to ThemeProvider. */
  scheme: ThemeColorSchemeKey
  /** User preference (may be `system`). */
  preference: ColorSchemePreference
  setPreference: (preference: ColorSchemePreference) => void
}

const defaultValue: ColorSchemeContextValue = {
  scheme: 'light',
  preference: 'system',
  setPreference: () => {
    // no-op outside provider
  },
}

export const ColorSchemeContext = createContext<ColorSchemeContextValue>(defaultValue)

export function useColorScheme(): ColorSchemeContextValue {
  return use(ColorSchemeContext)
}
