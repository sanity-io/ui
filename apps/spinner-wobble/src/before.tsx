import {Card, Flex, Spinner, Text, ThemeProvider} from '@sanity/ui-wobbly'
import {Autocomplete} from '@sanity/ui-wobbly/autocomplete'
import {buildTheme} from '@sanity/ui-wobbly/theme'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import '@sanity/ui-wobbly/styles.css'

import {createDemoTheme} from './demoTheme'
import {Scene} from './scene'

const theme = createDemoTheme(buildTheme())
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Could not find the root element to mount to')
}

createRoot(rootElement).render(
  <StrictMode>
    <Scene
      Autocomplete={Autocomplete}
      Card={Card}
      Flex={Flex}
      Spinner={Spinner}
      Text={Text}
      ThemeProvider={ThemeProvider}
      theme={theme}
      version="before"
    />
  </StrictMode>,
)
