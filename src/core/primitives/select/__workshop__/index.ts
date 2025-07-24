import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/select',
  title: 'Select',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./readOnly'))},
  ],
}

export default scope
