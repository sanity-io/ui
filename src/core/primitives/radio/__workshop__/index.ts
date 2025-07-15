import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/radio',
  title: 'Radio',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
  ],
}

export default scope
