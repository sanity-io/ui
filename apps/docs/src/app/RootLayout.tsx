'use client'

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
import {getImageUrlBuilder} from '@/lib/sanity/image'

import {AppContext, AppContextValue} from './AppContext'
import {VisualEditing} from './VisualEditing'

registerLanguage(bash)
registerLanguage(json)
registerLanguage(tsx)

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

  const [colorScheme, setColorScheme] = useState<ColorScheme | 'system'>('system')

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
    if (localColorScheme !== colorScheme) {
      // If the value from local storage is different from the current state, update the state
      // this typically only happens on mount
      startTransition(() => {
        setColorScheme(localColorScheme)
      })
    }
  }, [colorScheme])

  const {nav: navNode = null, settings = null} = data || {}

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
      setColorScheme: (s) => {
        window.localStorage.setItem('sanityStudio:ui:colorScheme', s)
        setColorScheme(s)
      },
      settings,
    }),
    [colorScheme, dataset, hintHiddenContent, nav, projectId, setColorScheme, settings],
  )

  return (
    <Root
      lang="en"
      scheme={colorScheme === 'system' ? (prefersDark ? 'dark' : 'light') : colorScheme}
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <AppContext.Provider value={app}>{children}</AppContext.Provider>
      {draftMode && <VisualEditing dataset={dataset} projectId={projectId} />}
    </Root>
  )
}
