import {studioTheme, ThemeColorSchemeKey, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {StrictMode, useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'

import {WorkshopConfig} from './config'
import {GlobalStyle} from './GlobalStyle'
import {createLocationStore} from './location'
import {Workshop} from './Workshop'

/** @beta */
export function mount(options: {config: WorkshopConfig; element: HTMLElement | null}): void {
  const {config, element} = options

  if (!element) throw new Error('missing element')

  const root = createRoot(element)

  root.render(
    <StrictMode>
      <Root config={config} />
    </StrictMode>,
  )
}

function Root(props: {config: WorkshopConfig}) {
  const {config} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(prefersDark ? 'dark' : 'light')
  const locationStore = useMemo(() => createLocationStore(), [])

  useEffect(() => {
    setScheme(prefersDark ? 'dark' : 'light')
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
