'use client'

import '@sanity/ui/css/index.css'

import createImageUrlBuilder from '@sanity/image-url'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {Root, usePrefersDark} from '@sanity/ui'
import {ColorScheme} from '@sanity/ui/theme'
import {ReactNode, startTransition, useEffect, useMemo, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {GlobalData} from '@/lib/data'
import {parseNav} from '@/lib/nav'

import {AppContext, AppContextValue} from './AppContext'
import {DisableDraftMode} from './DisableDraftMode'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

export function RootLayout(props: {
  children?: ReactNode
  data: WrappedValue<GlobalData>
  dataset: string
  draftMode: boolean
  hintHiddenContent: boolean
  initialScheme: ColorScheme | null
  projectId: string
  studioBaseUrl: string
}) {
  const {
    children,
    data,
    dataset,
    draftMode,
    hintHiddenContent,
    initialScheme,
    projectId,
    studioBaseUrl,
  } = props
  const prefersDark = usePrefersDark(() => initialScheme === 'dark')

  const [scheme, setColorScheme] = useState<ColorScheme | 'system'>('system')

  useEffect(() => {
    const localColorScheme = window.localStorage.getItem('sanityStudio:ui:colorScheme') || 'system'
    if (
      localColorScheme !== 'system' &&
      localColorScheme !== 'dark' &&
      localColorScheme !== 'light'
    ) {
      // If the restored value is invalid then ignore it
      return
    }
    if (localColorScheme !== scheme) {
      // If the value from local storage is different from the current state, update the state
      // this typically only happens on mount
      startTransition(() => {
        setColorScheme(localColorScheme)
      })
    }
  }, [scheme])

  const {nav: navNode = null, settings = null} = data || {}

  const nav = useMemo(() => navNode && parseNav(navNode, []), [navNode])

  const imageUrlBuilder = useMemo(
    () =>
      createImageUrlBuilder({
        projectId,
        dataset,
      }),
    [dataset, projectId],
  )

  const app: AppContextValue = useMemo(
    () => ({
      basePath: '/ui',
      colorScheme: scheme,
      dataset,
      features: {hintHiddenContent},
      imageUrlBuilder,
      nav,
      projectId,
      setColorScheme: (s) => {
        window.localStorage.setItem('sanityStudio:ui:colorScheme', s)
        setColorScheme(s)
      },
      settings,
      studioBaseUrl,
    }),
    [
      scheme,
      dataset,
      hintHiddenContent,
      imageUrlBuilder,
      nav,
      projectId,
      setColorScheme,
      settings,
      studioBaseUrl,
    ],
  )

  return (
    <AppContext.Provider value={app}>
      <Root
        height="fill"
        lang="en"
        overflow="auto"
        scheme={scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {children}

        {draftMode && (
          <>
            {/* <VisualEditing /> */}
            <DisableDraftMode />
          </>
        )}
      </Root>
    </AppContext.Provider>
  )
}
