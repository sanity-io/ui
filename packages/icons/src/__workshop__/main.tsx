// The preferred way to reach a single icon: importing from its dedicated subpath keeps
// bundles small and treeshake fast. The named export is identical to the barrel's, so
// `import {RocketIcon} from '@sanity/icons/Rocket'` and
// `import {RocketIcon} from '@sanity/icons'` are interchangeable.
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
