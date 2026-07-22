// The way to reach a single icon eagerly: importing from its dedicated subpath keeps
// bundles small and treeshaking fast. The root entry only exposes the lazy `icons` map
// and the `<Icon>` component.
import {RocketIcon} from '@sanity/icons/Rocket'
import {Card, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {renderToStaticMarkup} from 'react-dom/server'

import Overview from './overview'

const theme = buildTheme()

const rootStyle = {minHeight: '100vh'}

const faviconStyle = {color: '#101112'}

// Use the imported icon as the showcase favicon.
function setFavicon() {
  const markup = renderToStaticMarkup(<RocketIcon width={32} height={32} style={faviconStyle} />)
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = `data:image/svg+xml,${encodeURIComponent(markup)}`
  document.head.appendChild(link)
}

setFavicon()

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
