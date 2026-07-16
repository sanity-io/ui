import type {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {headers} from 'next/headers'
import {Suspense} from 'react'

import {ColorSchemeProviderClient} from './ColorSchemeProvider.client'

async function ColorSchemeProviderServer({children}: {children: React.ReactNode}) {
  const initialColorScheme = (
    (await headers()).get('sec-ch-prefers-color-scheme') === 'dark' ? 'dark' : 'light'
  ) satisfies ThemeColorSchemeKey
  return (
    <ColorSchemeProviderClient initialValue={initialColorScheme}>
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
