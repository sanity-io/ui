import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import type {WorkshopConfig} from './config/types'
import {WorkshopFrame} from './frame/WorkshopFrame'

/** @beta */
export function mountFrame(options: {config: WorkshopConfig; element: HTMLElement | null}): void {
  const {config, element} = options

  if (!element) throw new Error('missing element')

  const root = createRoot(element)

  root.render(
    <StrictMode>
      <WorkshopFrame config={config} />
    </StrictMode>,
  )
}
