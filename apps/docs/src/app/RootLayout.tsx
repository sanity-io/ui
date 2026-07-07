'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {LayerProvider, ThemeProvider, ToastProvider, usePrefersDark} from '@sanity/ui'
import {buildTheme, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {Inter} from 'next/font/google'
import {ReactNode, useMemo, useSyncExternalStore} from 'react'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import json from 'refractor/lang/json'
import tsx from 'refractor/lang/tsx'

import {GlobalData} from '@/lib/data'
import {parseNav} from '@/lib/nav'
import {getImageUrlBuilder} from '@/lib/sanity/image'
import {StyledComponentsRegistry} from '@/lib/styled/registry'

import {AppContext, AppContextValue} from './AppContext'
import {GlobalStyle} from './GlobalStyle'
import {VisualEditing} from './VisualEditing'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(json)
Refractor.registerLanguage(tsx)

const inter = Inter({subsets: ['latin']})

const theme = buildTheme()

// The color scheme lives in `localStorage` (an external store) and is read
// with `useSyncExternalStore`: the server (and hydration) renders `system`,
// and the persisted value is picked up in the client render that follows.
const COLOR_SCHEME_KEY = 'sanityStudio:ui:colorScheme'

const colorSchemeListeners = new Set<() => void>()

function subscribeToColorScheme(listener: () => void): () => void {
  colorSchemeListeners.add(listener)

  return () => colorSchemeListeners.delete(listener)
}

function getColorScheme(): ThemeColorSchemeKey | 'system' {
  const stored = window.localStorage.getItem(COLOR_SCHEME_KEY)

  // Ignore invalid persisted values
  return stored === 'dark' || stored === 'light' ? stored : 'system'
}

function getServerColorScheme(): 'system' {
  return 'system'
}

function setColorScheme(scheme: ThemeColorSchemeKey | 'system'): void {
  window.localStorage.setItem(COLOR_SCHEME_KEY, scheme)

  for (const listener of colorSchemeListeners) {
    listener()
  }
}

export function RootLayout(props: {
  children?: ReactNode
  data: WrappedValue<GlobalData>
  dataset: string
  draftMode: boolean
  hintHiddenContent: boolean
  projectId: string
  studioOrigin?: string
  prefersDarkServerSnapshot: boolean
}) {
  const {
    children,
    data,
    dataset,
    draftMode,
    hintHiddenContent,
    projectId,
    prefersDarkServerSnapshot,
  } = props
  const prefersDark = usePrefersDark(() => prefersDarkServerSnapshot)

  const colorScheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    getServerColorScheme,
  )

  const {nav: navNode, settings} = data

  const nav = useMemo(() => navNode && parseNav(navNode, []), [navNode])

  const app: AppContextValue = useMemo(
    () => ({
      basePath: '/ui',
      colorScheme,
      dataset,
      features: {hintHiddenContent},
      imageUrlBuilder: getImageUrlBuilder({dataset, projectId}).imageUrlBuilder,
      nav,
      projectId,
      setColorScheme,
      settings,
    }),
    [colorScheme, dataset, hintHiddenContent, nav, projectId, settings],
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider
            scheme={colorScheme === 'system' ? (prefersDark ? 'dark' : 'light') : colorScheme}
            theme={theme}
          >
            <GlobalStyle />
            <AppContext.Provider value={app}>
              <LayerProvider>
                <ToastProvider>{children}</ToastProvider>
              </LayerProvider>
            </AppContext.Provider>
          </ThemeProvider>
        </StyledComponentsRegistry>
        {draftMode && <VisualEditing dataset={dataset} projectId={projectId} />}
      </body>
    </html>
  )
}
