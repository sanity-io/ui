import {createRoot} from 'react-dom/client'

import {App} from './App'
import './app.css'

// The precompiled library stylesheets (`<pkg>/styles.css`, copied to public/ by
// scripts/build-libs.mjs) are loaded as separate `<link>` tags so the test can
// load them in either order — like a Studio bundle's `index.css` next to a
// plugin's bundled CSS.
const sheets: Record<string, string> = {
  v1: '/stylex-button-v1.css',
  v2: '/stylex-button-v2.css',
}
const order = (new URLSearchParams(location.search).get('order') ?? 'v1,v2').split(',')

function loadSheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`failed to load ${href}`))
    document.head.appendChild(link)
  })
}

// load sequentially so the cascade order equals the requested order
for (const key of order) {
  const href = sheets[key]
  if (href) await loadSheet(href)
}
document.documentElement.dataset.sheetOrder = order.join(',')

if (import.meta.env.DEV) {
  // dev-only: the unplugin serves the app's own StyleX CSS from a virtual module
  await import('virtual:stylex:css-only')
}

createRoot(document.getElementById('root')!).render(<App />)
