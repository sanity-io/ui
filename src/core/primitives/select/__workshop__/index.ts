import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/select',
  title: 'Select',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./Plain'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./ReadOnly'))},
  ],
}

export default scope
