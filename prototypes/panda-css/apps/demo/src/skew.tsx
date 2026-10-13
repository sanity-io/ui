// The exact SAPP-4639 failure shape: NEW JavaScript served with the PREVIOUS
// version's CSS. Only v1's stylesheet is loaded here, while v2's components
// render. With content-addressed class names a v2 class either exists in v1's
// CSS with the identical rule, or does not exist at all — it can never resolve
// to a different rule, so the worst case is a missing declaration, not a wrong one.
import '@sanity-eval/panda-button-v1/styles.css'
import './demo.css'

import * as V2 from '@sanity-eval/panda-button-v2'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

const {Button, ThemeProvider, VERSION, buttonModes, tones} = V2

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <h1>Version skew: JavaScript {VERSION} rendered with only the 4.4.3 stylesheet</h1>
      <p>Classes shared with 4.4.3 resolve to their identical rules; classes new in 4.4.4 have no rule at all.</p>
      <section className="version" data-version={VERSION}>
        <ThemeProvider scheme="light">
          <div className="scheme">
            <div className="grid">
              {tones.map((tone) =>
                buttonModes.map((mode) => (
                  <Button key={`${tone}-${mode}`} tone={tone} mode={mode} data-testid={`skew-${tone}-${mode}`}>
                    {tone} / {mode}
                  </Button>
                )),
              )}
            </div>
          </div>
        </ThemeProvider>
      </section>
    </main>
  </StrictMode>,
)
