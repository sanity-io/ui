'use client'

import {usePrefersDark} from '@sanity/ui'
import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useDeferredValue} from 'react'

import {ColorSchemeContext} from '#context/color-scheme'

export function ColorSchemeProviderClient({
  children,
  initialValue,
}: {
  children: React.ReactNode
  initialValue: ThemeColorSchemeKey
}) {
  const initiallyPrefersDark = initialValue === 'dark'
  const prefersDark = useDeferredValue(
    usePrefersDark(() => initiallyPrefersDark),
    initiallyPrefersDark,
  )

  // @TODO DO NOT ALLOW MERGING THIS PR BEFORE THE TEMPORARY SUSPENSE BOUNDARY IS RMOVED
  return <ColorSchemeContext value={prefersDark ? 'dark' : 'light'}>{children}</ColorSchemeContext>
}
