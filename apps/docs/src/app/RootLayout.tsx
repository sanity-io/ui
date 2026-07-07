'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {LayerProvider, ThemeProvider, ToastProvider, usePrefersDark} from '@sanity/ui'
import {buildTheme, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {Inter} from 'next/font/google'
import {ReactNode, useDeferredValue, useMemo, useSyncExternalStore} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {GlobalData} from '@/lib/data'
import {parseNav} from '@/lib/nav'
import {getImageUrlBuilder} from '@/lib/sanity/image'
import {StyledComponentsRegistry} from '@/lib/styled/registry'

import {AppContext, AppContextValue} from './AppContext'
import {GlobalStyle} from './GlobalStyle'
import {VisualEditing} from './VisualEditing'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

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

  // `useDeferredValue` with the server snapshot as its initial value keeps
  // hydration non-blocking: the persisted color scheme is applied in a
  // deferred re-render instead of forcing a synchronous one
  const colorScheme = useDeferredValue(
    useSyncExternalStore(subscribeToColorScheme, getColorScheme, getServerColorScheme),
    getServerColorScheme(),
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
