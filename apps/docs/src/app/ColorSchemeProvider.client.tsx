'use client'

import {usePrefersDark} from '@sanity/ui'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useDeferredValue, useState} from 'react'

import {ColorSchemeContext} from '#context/color-scheme'
import {
  type ColorSchemePreference,
  resolveColorScheme,
  setColorSchemeCookie,
} from '#lib/color-scheme.ts'

export function ColorSchemeProviderClient({
  children,
  initialPreference,
  initialSystemScheme,
}: {
  children: React.ReactNode
  initialPreference: ColorSchemePreference
  initialSystemScheme: ThemeColorSchemeKey
}) {
  const [preference, setPreferenceState] = useState(initialPreference)

  const initiallyPrefersDark = initialSystemScheme === 'dark'
  const prefersDark = useDeferredValue(
    usePrefersDark(() => initiallyPrefersDark),
    initiallyPrefersDark,
  )
  const systemScheme: ThemeColorSchemeKey = prefersDark ? 'dark' : 'light'
  const scheme = resolveColorScheme(preference, systemScheme)

  function setPreference(next: ColorSchemePreference) {
    setPreferenceState(next)
    setColorSchemeCookie(next)
  }

  return (
    <ColorSchemeContext value={{scheme, preference, setPreference}}>{children}</ColorSchemeContext>
  )
}
