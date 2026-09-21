import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'

// Both copies of @sanity/ui emit the same spinner class name, so a document
// may only load one of them. Each variant is its own chunk, stylesheet
// included, and only the picked one is ever imported.
const variants = {
  after: lazy(() => import('./after')),
  before: lazy(() => import('./before')),
}

const Picker = lazy(() => import('./picker'))

const variant = new URLSearchParams(window.location.search).get('variant')
const App = variant === 'before' || variant === 'after' ? variants[variant] : Picker

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Could not find the root element to mount to')
}

createRoot(rootElement).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
