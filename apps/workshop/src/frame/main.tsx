import {studioTheme, ThemeColorSchemeKey, ThemeProvider} from '@sanity/ui'
import {WorkshopFrame} from '@sanity/ui-workshop'
import React, {StrictMode, useState} from 'react'
import {createRoot} from 'react-dom/client'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {config} from '../config'
import {GlobalStyle} from '../GlobalStyle'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function Root() {
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>('light')

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <GlobalStyle />
      <WorkshopFrame config={config} setScheme={setScheme} />
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
