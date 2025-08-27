import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/checkbox',
  title: 'Checkbox',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./Props'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./Example'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./ReadOnly'))},
    {name: 'multiple-tones', title: 'Multiple tones', component: lazy(() => import('./Tones'))},
  ],
}

export default scope
