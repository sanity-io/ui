'use client'

import '@sanity/ui/css/index.css'

import createImageUrlBuilder from '@sanity/image-url'
import type {WrappedValue} from '@sanity/react-loader/jsx'
import {Root, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {ClientPerspective} from 'next-sanity'
import {startTransition, useEffect, useMemo, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import {basePath} from '@/env'
import type {GlobalData} from '@/lib/data'
import {parseNav} from '@/lib/nav'

import {AppContext, AppContextValue} from './AppContext'
import {AppEnv} from './types'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

export function RootLayout(props: {
  children?: React.ReactNode
  data: WrappedValue<GlobalData>
  env: AppEnv
  dataset: string
  hintHiddenContent: boolean
  initialScheme: ColorScheme | null
  perspective: ClientPerspective | undefined
  projectId: string
  studioBaseUrl: string
}) {
  const {
    children,
    data,
    dataset,
    env,
    hintHiddenContent,
    initialScheme,
    perspective,
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
      basePath,
      colorScheme: scheme,
      dataset,
      env,
      features: {
        hintHiddenContent,
      },
      imageUrlBuilder,
      nav,
      perspective,
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
      env,
      hintHiddenContent,
      imageUrlBuilder,
      nav,
      perspective,
      projectId,
      setColorScheme,
      settings,
      studioBaseUrl,
    ],
  )

  return (
    <AppContext.Provider value={app}>
      <Root
        data-dataset={dataset}
        data-perspective={JSON.stringify(perspective)}
        height="fill"
        lang="en"
        overflow="auto"
        scheme={scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {children}
      </Root>
    </AppContext.Provider>
  )
}
