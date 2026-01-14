import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import type {WorkshopConfig} from './config/types'
import {WorkshopApp} from './WorkshopApp'

/** @beta */
export function mount(options: {config: WorkshopConfig; element: HTMLElement | null}): void {
  const {config, element} = options

  if (!element) throw new Error('missing element')

  const root = createRoot(element)

  root.render(
    <StrictMode>
      <WorkshopApp config={config} />
    </StrictMode>,
  )
}
