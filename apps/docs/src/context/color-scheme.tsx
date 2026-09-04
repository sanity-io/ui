'use client'

import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {createContext, use} from 'react'

import type {ColorSchemePreference} from '#lib/color-scheme.ts'

type SetColorSchemePreference = (preference: ColorSchemePreference) => void

/** The scheme to render with, `system` already resolved against the OS preference. */
const ColorSchemeContext = createContext<ThemeColorSchemeKey>('light')

/** The preference the user picked, which may be `system`. */
const ColorSchemePreferenceContext = createContext<ColorSchemePreference>('system')

/**
 * Kept separate from the value contexts so components that only change the
 * preference don't re-render whenever the scheme or preference changes.
 */
const SetColorSchemePreferenceContext = createContext<SetColorSchemePreference>(() => {})

export function ColorSchemeValueProvider({
  children,
  scheme,
}: {
  children: React.ReactNode
  scheme: ThemeColorSchemeKey
}) {
  return <ColorSchemeContext value={scheme}>{children}</ColorSchemeContext>
}

export function ColorSchemePreferenceProvider({
  children,
  preference,
}: {
  children: React.ReactNode
  preference: ColorSchemePreference
}) {
  return <ColorSchemePreferenceContext value={preference}>{children}</ColorSchemePreferenceContext>
}

export function SetColorSchemePreferenceProvider({
  children,
  setPreference,
}: {
  children: React.ReactNode
  setPreference: SetColorSchemePreference
}) {
  return (
    <SetColorSchemePreferenceContext value={setPreference}>
      {children}
    </SetColorSchemePreferenceContext>
  )
}

export function useColorScheme(): ThemeColorSchemeKey {
  return use(ColorSchemeContext)
}

export function useColorSchemePreference(): ColorSchemePreference {
  return use(ColorSchemePreferenceContext)
}

export function useSetColorSchemePreference(): SetColorSchemePreference {
  return use(SetColorSchemePreferenceContext)
}
