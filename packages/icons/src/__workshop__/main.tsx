import {Card, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import Overview from './overview'

const theme = buildTheme()

const rootStyle = {minHeight: '100vh'}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Could not find the root element to mount to')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Card style={rootStyle}>
        <Overview />
      </Card>
    </ThemeProvider>
  </StrictMode>,
)
