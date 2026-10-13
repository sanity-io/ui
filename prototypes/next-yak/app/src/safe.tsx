import '@yak-eval/ui-v1/styles.css'
import '@yak-eval/ui-v2/styles.css'
import './page.css'

import * as v1 from '@yak-eval/ui-v1'
import * as v2 from '@yak-eval/ui-v2'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {Page} from './Page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page
      title="next-yak: v1 and v2 on one page (per-version prefix)"
      description="Both packages were compiled with viteYak({prefix: hash(name@version)}). Every class name of v1 starts with a different prefix than v2, so the two stylesheets cannot collide."
      v1={v1}
      v2={v2}
    />
  </StrictMode>,
)
