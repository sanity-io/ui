import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {cookies, headers} from 'next/headers'
import {Suspense} from 'react'

import {COLOR_SCHEME_COOKIE, parseColorSchemePreference} from '#lib/color-scheme.ts'

import {ColorSchemeProviderClient} from './ColorSchemeProvider.client'

async function ColorSchemeProviderServer({children}: {children: React.ReactNode}) {
  const jar = await cookies()
  const preference = parseColorSchemePreference(jar.get(COLOR_SCHEME_COOKIE)?.value)

  const systemScheme = (
    (await headers()).get('sec-ch-prefers-color-scheme') === 'dark' ? 'dark' : 'light'
  ) satisfies ThemeColorSchemeKey

  return (
    <ColorSchemeProviderClient initialPreference={preference} initialSystemScheme={systemScheme}>
      {children}
    </ColorSchemeProviderClient>
  )
}

export function ColorSchemeProvider({children}: {children: React.ReactNode}) {
  return (
    <Suspense fallback={children}>
      <ColorSchemeProviderServer>{children}</ColorSchemeProviderServer>
    </Suspense>
  )
}
