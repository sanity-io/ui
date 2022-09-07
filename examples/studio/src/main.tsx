import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Root} from './root'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('missing #root element')
}

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
)
