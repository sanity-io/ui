import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'root',
  title: 'Root',
  stories: [
    {
      name: 'boundary',
      title: 'Boundary',
      component: lazy(() => import('./boundary')),
    },
  ],
}

export default scope
