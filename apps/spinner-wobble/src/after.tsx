import {Card, Flex, Spinner, Text, ThemeProvider} from '@sanity/ui-fixed'
import {Autocomplete} from '@sanity/ui-fixed/autocomplete'
import {buildTheme} from '@sanity/ui-fixed/theme'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import '@sanity/ui-fixed/styles.css'

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
      version="after"
    />
  </StrictMode>,
)
