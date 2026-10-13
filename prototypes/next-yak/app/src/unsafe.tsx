import '@yak-eval/ui-v1/unsafe.css'
import '@yak-eval/ui-v2/unsafe.css'
import './page.css'

import * as v1 from '@yak-eval/ui-v1/unsafe'
import * as v2 from '@yak-eval/ui-v2/unsafe'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {Page} from './Page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page
      title="next-yak: v1 and v2 on one page (default naming)"
      description="Both packages were compiled with next-yak's out-of-the-box naming: y + hash(file path) + counter. v2 added one component above Button, so the same class names now mean different rules — v1's buttons pick up v2's declarations."
      v1={v1}
      v2={v2}
    />
  </StrictMode>,
)
