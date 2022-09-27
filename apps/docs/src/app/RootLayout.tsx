'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {ThemeProvider, ToastProvider, usePrefersDark} from '@sanity/ui'
import {buildTheme, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {Inter} from 'next/font/google'
import {ReactNode, useMemo, useState} from 'react'
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

export function RootLayout(props: {
  children?: ReactNode
  data: WrappedValue<GlobalData>
  dataset: string
  draftMode: boolean
  hintHiddenContent: boolean
  projectId: string
  studioOrigin?: string
}) {
  const {children, data, dataset, draftMode, hintHiddenContent, projectId} = props
  const prefersDark = usePrefersDark()

  const [colorScheme, setColorScheme] = useState<ThemeColorSchemeKey | 'system'>(() => {
    if (typeof window === 'undefined') {
      return 'system'
    }

    return (window.localStorage.getItem('sanityStudio:ui:colorScheme') || 'system') as
      | ThemeColorSchemeKey
      | 'system'
  })

  const {nav: navNode = null, settings = null} = data || {}

  const nav = useMemo(() => navNode && parseNav(navNode, []), [navNode])

  const app: AppContextValue = useMemo(
    () => ({
      colorScheme,
      dataset,
      features: {hintHiddenContent},
      imageUrlBuilder: getImageUrlBuilder({dataset, projectId}).imageUrlBuilder,
      nav,
      projectId,
      setColorScheme: (s) => {
        window.localStorage.setItem('sanityStudio:ui:colorScheme', s)
        setColorScheme(s)
      },
      settings,
    }),
    [colorScheme, dataset, hintHiddenContent, nav, projectId, setColorScheme, settings],
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
              <ToastProvider>{children}</ToastProvider>
            </AppContext.Provider>
          </ThemeProvider>
        </StyledComponentsRegistry>
        {draftMode && <VisualEditing dataset={dataset} projectId={projectId} />}
      </body>
    </html>
  )
}
