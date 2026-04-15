'use client'

import '@sanity/ui/index.css'

import {assignInlineVars} from '@vanilla-extract/dynamic'
import createImageUrlBuilder from '@sanity/image-url'
import {unwrapData, type WrappedValue} from '@sanity/react-loader/jsx'
import {Root, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui'
import {ClientPerspective} from 'next-sanity'
import {startTransition, useEffect, useMemo, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import json from 'refractor/json'
import tsx from 'refractor/tsx'

import type {GlobalData} from '@/lib/data'
import {parseNav} from '@/lib/nav'

import {AppContext, AppContextValue} from './AppContext'
import {AppEnv} from './types'
import {waldenburgNormal} from './fonts'
import {vars} from '@sanity/ui'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

export function RootLayout(props: {
  basePath: string
  children?: React.ReactNode
  data: WrappedValue<GlobalData>
  defaultVersion: string
  draftMode: boolean
  env: AppEnv
  dataset: string
  hintHiddenContent: boolean
  initialScheme: ColorScheme | null
  perspective: ClientPerspective | undefined
  projectId: string
  studioBaseUrl: string
  version: string
}) {
  const {
    basePath,
    children,
    data,
    dataset,
    defaultVersion,
    draftMode,
    env,
    hintHiddenContent,
    initialScheme,
    perspective,
    projectId,
    studioBaseUrl,
    version,
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

  const {nav: navNode = null, navTrees, settings = null} = data || {}

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
      defaultVersion,
      draftMode,
      env,
      features: {
        hintHiddenContent,
      },
      imageUrlBuilder,
      nav,
      navTrees: unwrapData(navTrees),
      perspective,
      projectId,
      setColorScheme: (s) => {
        window.localStorage.setItem('sanityStudio:ui:colorScheme', s)
        setColorScheme(s)
      },
      settings,
      studioBaseUrl,
      version,
    }),
    [
      basePath,
      dataset,
      defaultVersion,
      draftMode,
      env,
      hintHiddenContent,
      imageUrlBuilder,
      nav,
      navTrees,
      perspective,
      projectId,
      scheme,
      setColorScheme,
      settings,
      studioBaseUrl,
      version,
    ],
  )

  return (
    <AppContext.Provider value={app}>
      <Root
        className={waldenburgNormal.variable}
        data-dataset={dataset}
        data-perspective={JSON.stringify(perspective)}
        height="fill"
        lang="en"
        overflow="auto"
        scheme={scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme}
        tone="transparent"
        style={{
          ...assignInlineVars({
            [vars.font.heading.family]: waldenburgNormal.style.fontFamily,
            [vars.font.heading.featureSettings]:
              `"ss07" on,"cv01" on,"cv11" on,"cv12" on,"cv13" on`,
          }),
        }}
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {children}
      </Root>
    </AppContext.Provider>
  )
}
