import {
  studioTheme,
  ThemeColorProvider,
  ThemeColorSchemeKey,
  ThemeProvider,
  useGlobalKeyDown,
  usePrefersDark,
} from '@sanity/ui'
import {createLocationStore, Workshop} from '@sanity/ui-workshop'
import React, {StrictMode, useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {config} from './config'
import {GlobalStyle} from './GlobalStyle'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function Root() {
  const locationStore = useMemo(() => createLocationStore(), [])
  const prefersDark = usePrefersDark()

  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(() => {
    const loc = locationStore.get()

    if (loc.query?.scheme) {
      return loc.query.scheme as ThemeColorSchemeKey
    }

    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const loc = locationStore.get()

    if (!loc.query?.scheme) {
      setScheme(prefersDark ? 'dark' : 'light')
    }
  }, [locationStore, prefersDark])

  useGlobalKeyDown((event) => {
    if (event.metaKey && event.key === 'i') {
      setScheme((v) => (v === 'light' ? 'dark' : 'light'))
    }
  })

  useEffect(() => {
    return locationStore.subscribe((loc) => {
      if (!loc.query?.scheme) {
        setScheme(prefersDark ? 'dark' : 'light')
      }
    })
  }, [locationStore, prefersDark])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <ThemeColorProvider tone="transparent">
        <GlobalStyle />
      </ThemeColorProvider>
      <Workshop
        config={config}
        locationStore={locationStore}
        scheme={scheme}
        onSchemeChange={setScheme}
      />
    </ThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
)
