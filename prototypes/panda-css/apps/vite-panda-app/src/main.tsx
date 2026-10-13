import './index.css'
import '@sanity-eval/panda-button-v1/styles.css'

import {Button, ThemeProvider} from '@sanity-eval/panda-button-v1'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {css, cva} from '../styled-system/css'

// Static call site: rewritten to a class string by the source transform.
const page = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  padding: '4',
  bg: 'paper',
  color: 'ink',
})

// Atomic recipe used with a literal variant: also statically resolvable.
const card = cva({
  base: {padding: '2', borderRadius: 'md', borderWidth: '1px', borderStyle: 'solid', borderColor: 'accent'},
  variants: {emphasis: {low: {bg: 'paper'}, high: {bg: 'accent', color: 'paper'}}},
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={page} data-testid="page">
      <div className={card({emphasis: 'high'})} data-testid="card">
        App-side Panda (prefix <code>app</code>) next to the pre-built library (prefix <code>sui-v4</code>):
      </div>
      <ThemeProvider scheme="light">
        <Button tone="primary" data-testid="lib-button">
          Library button
        </Button>
      </ThemeProvider>
    </div>
  </StrictMode>,
)
