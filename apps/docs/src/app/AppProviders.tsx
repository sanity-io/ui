'use client'

import {LayerProvider, ThemeProvider, ToastProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {ReactNode, use, useMemo} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {ColorSchemeContext} from '#context/color-scheme'
import {getImageUrlBuilder} from '@/lib/sanity/image'

import {AppContext, AppContextValue} from './AppContext'
import {GlobalStyle} from './GlobalStyle'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

const theme = buildTheme()

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

  const app = useMemo(
    () =>
      ({
        features: {hintHiddenContent},
        imageUrlBuilder: getImageUrlBuilder({dataset, projectId}).imageUrlBuilder,
        nav: null,
        projectId,
        settings: null,
      }) satisfies AppContextValue,
    [dataset, hintHiddenContent, projectId],
  )
  const scheme = use(ColorSchemeContext)

  return (
    <ThemeProvider scheme={scheme} theme={theme}>
      <GlobalStyle />
      <AppContext.Provider value={app}>
        <LayerProvider>
          <ToastProvider>{children}</ToastProvider>
        </LayerProvider>
      </AppContext.Provider>
    </ThemeProvider>
  )
}
