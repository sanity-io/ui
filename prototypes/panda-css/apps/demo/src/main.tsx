// Stylesheet load order matters for the proof: v1 first, v2 last, so whenever
// both versions emit the SAME class name with DIFFERENT declarations, v2 wins
// and v1's elements render wrong. The proof asserts that this never happens
// for the atomic (cva) Button, and that it DOES happen for the config-recipe
// Badge (negative control).
import '@sanity-eval/panda-button-v1/styles.css'
import '@sanity-eval/panda-button-v2/styles.css'
import './demo.css'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {App} from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
