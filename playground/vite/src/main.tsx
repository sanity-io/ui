import '@sanity/ui/css/index.css'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'

createRoot(document).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
