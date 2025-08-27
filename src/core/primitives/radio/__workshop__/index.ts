import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/radio',
  title: 'Radio',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./Plain'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./Example'))},
  ],
}

export default scope
