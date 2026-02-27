import {studioTheme, type ThemeColorSchemeKey,ThemeProvider, usePrefersDark} from '@sanity/ui'
import {startTransition, useEffect, useMemo, useState} from 'react'

import type {WorkshopConfig} from './config/types'
import {GlobalStyle} from './GlobalStyle'
import {createLocationStore} from './location/LocationStore'
import {Workshop} from './Workshop'

export function WorkshopApp(props: {config: WorkshopConfig}) {
  const {config} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(prefersDark ? 'dark' : 'light')
  const locationStore = useMemo(() => createLocationStore(), [])

  useEffect(() => {
    startTransition(() => setScheme(prefersDark ? 'dark' : 'light'))
  }, [prefersDark])

  return (
    <ThemeProvider scheme={scheme} theme={config.theme || studioTheme}>
      <GlobalStyle />
      <Workshop
        config={config}
        locationStore={locationStore}
        scheme={scheme}
        onSchemeChange={setScheme}
      />
    </ThemeProvider>
  )
}
