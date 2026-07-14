'use client'

import {LayerProvider, ThemeProvider, ToastProvider, usePrefersDark} from '@sanity/ui'
import {buildTheme, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {ReactNode, useDeferredValue, useMemo, useSyncExternalStore} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {getImageUrlBuilder} from '@/lib/sanity/image'
import {StyledComponentsRegistry} from '@/lib/styled/registry'

import {AppContext, AppContextValue} from './AppContext'
import {GlobalStyle} from './GlobalStyle'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

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

/**
 * Global providers shared by every route (the website, the embedded studio
 * and the arcade frame). Sanity content (nav, settings) is provided per route
 * group by `AppDataProvider`, which overrides this context with fetched data.
 */
export function AppProviders(props: {
  children?: ReactNode
  dataset: string
  hintHiddenContent: boolean
  projectId: string
}) {
  const {children, dataset, hintHiddenContent, projectId} = props

  // The server (and the prerendered static shell) renders the light scheme;
  // `usePrefersDark` picks up `prefers-color-scheme` on the client
  const prefersDark = usePrefersDark(() => false)

  // `useDeferredValue` with the server snapshot as its initial value keeps
  // hydration non-blocking: the persisted color scheme is applied in a
  // deferred re-render instead of forcing a synchronous one
  const colorScheme = useDeferredValue(
    useSyncExternalStore(subscribeToColorScheme, getColorScheme, getServerColorScheme),
    getServerColorScheme(),
  )

  const app = useMemo(
    () => ({

      colorScheme,
      dataset,
      features: {hintHiddenContent},
      imageUrlBuilder: getImageUrlBuilder({dataset, projectId}).imageUrlBuilder,
      nav: null,
      projectId,
      setColorScheme,
      settings: null,
    }) satisfies AppContextValue,
    [colorScheme, dataset, hintHiddenContent, projectId],
  )

  return (
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
  )
}
